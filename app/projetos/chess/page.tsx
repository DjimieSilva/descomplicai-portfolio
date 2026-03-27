"use client";

import { useState, useCallback, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";

// ─── Types ────────────────────────────────────────────────────────────────────

type Color = "white" | "black";
type PieceType = "king" | "queen" | "rook" | "bishop" | "knight" | "pawn";

interface Piece {
  type: PieceType;
  color: Color;
  id: string;
}

type Square = Piece | null;
type Board = Square[][];

interface Position {
  row: number;
  col: number;
}

interface CastlingRights {
  whiteKingSide: boolean;
  whiteQueenSide: boolean;
  blackKingSide: boolean;
  blackQueenSide: boolean;
}

interface MoveResult {
  board: Board;
  enPassantTarget: Position | null;
  castlingRights: CastlingRights;
  captured: Piece | null;
  promotion: boolean;
  castled: "kingSide" | "queenSide" | null;
}

interface PromotionPending {
  from: Position;
  to: Position;
  result: MoveResult; // board with pawn at destination (unpromotioned)
}

interface HistorySnapshot {
  board: Board;
  currentTurn: Color;
  enPassantTarget: Position | null;
  castlingRights: CastlingRights;
  capturedWhite: Piece[];
  capturedBlack: Piece[];
  moveHistory: string[];
  halfMoveClock: number;
  fullMoveNumber: number;
  positionHistory: string[];
  isCheck: boolean;
}

interface GameState {
  board: Board;
  currentTurn: Color;
  selectedSquare: Position | null;
  legalMoves: Position[];
  enPassantTarget: Position | null;
  castlingRights: CastlingRights;
  capturedWhite: Piece[];
  capturedBlack: Piece[];
  moveHistory: string[];
  isCheck: boolean;
  isCheckmate: boolean;
  isStalemate: boolean;
  winner: Color | null;
  halfMoveClock: number;
  fullMoveNumber: number;
  positionHistory: string[];
  isDraw: boolean;
  drawReason: string;
  boardHistory: HistorySnapshot[];
  promotionPending: PromotionPending | null;
}

// ─── Constants ────────────────────────────────────────────────────────────────

const UNICODE_PIECES: Record<PieceType, Record<Color, string>> = {
  king:   { white: "♔", black: "♚" },
  queen:  { white: "♕", black: "♛" },
  rook:   { white: "♖", black: "♜" },
  bishop: { white: "♗", black: "♝" },
  knight: { white: "♘", black: "♞" },
  pawn:   { white: "♙", black: "♟" },
};

const PIECE_VALUES: Record<PieceType, number> = {
  pawn: 1, knight: 3, bishop: 3, rook: 5, queen: 9, king: 0,
};

const LIGHT_SQUARE = "#f0d9b5";
const DARK_SQUARE  = "#b58863";
const FILE_LABELS  = ["a", "b", "c", "d", "e", "f", "g", "h"];

// ─── Piece factory ─────────────────────────────────────────────────────────────

let _pieceCounter = 0;
function makePiece(type: PieceType, color: Color): Piece {
  return { type, color, id: `${color[0]}${type[0]}${++_pieceCounter}` };
}

// ─── Board helpers ─────────────────────────────────────────────────────────────

function createInitialBoard(): Board {
  const b: Board = Array.from({ length: 8 }, () => Array(8).fill(null));
  const backRank: PieceType[] = ["rook","knight","bishop","queen","king","bishop","knight","rook"];
  for (let c = 0; c < 8; c++) {
    b[0][c] = makePiece(backRank[c], "black");
    b[1][c] = makePiece("pawn", "black");
    b[6][c] = makePiece("pawn", "white");
    b[7][c] = makePiece(backRank[c], "white");
  }
  return b;
}

function cloneBoard(b: Board): Board {
  return b.map(row => row.map(sq => sq ? { ...sq } : null));
}

function inBounds(r: number, c: number): boolean {
  return r >= 0 && r < 8 && c >= 0 && c < 8;
}

function posEq(a: Position, b: Position): boolean {
  return a.row === b.row && a.col === b.col;
}

function findKing(b: Board, color: Color): Position {
  for (let r = 0; r < 8; r++)
    for (let c = 0; c < 8; c++) {
      const p = b[r][c];
      if (p && p.type === "king" && p.color === color) return { row: r, col: c };
    }
  return { row: -1, col: -1 };
}

// ─── Attack / check detection ─────────────────────────────────────────────────

function isSquareAttackedBy(b: Board, pos: Position, byColor: Color): boolean {
  const { row, col } = pos;

  // Pawn
  const pd = byColor === "white" ? 1 : -1;
  for (const dc of [-1, 1]) {
    const pr = row + pd, pc = col + dc;
    if (inBounds(pr, pc)) {
      const p = b[pr][pc];
      if (p && p.type === "pawn" && p.color === byColor) return true;
    }
  }

  // Knight
  for (const [dr, dc] of [[-2,-1],[-2,1],[-1,-2],[-1,2],[1,-2],[1,2],[2,-1],[2,1]]) {
    const nr = row+dr, nc = col+dc;
    if (inBounds(nr, nc)) {
      const p = b[nr][nc];
      if (p && p.type === "knight" && p.color === byColor) return true;
    }
  }

  // Rook / Queen (straight)
  for (const [dr, dc] of [[-1,0],[1,0],[0,-1],[0,1]]) {
    let nr = row+dr, nc = col+dc;
    while (inBounds(nr, nc)) {
      const p = b[nr][nc];
      if (p) {
        if (p.color === byColor && (p.type === "rook" || p.type === "queen")) return true;
        break;
      }
      nr += dr; nc += dc;
    }
  }

  // Bishop / Queen (diagonal)
  for (const [dr, dc] of [[-1,-1],[-1,1],[1,-1],[1,1]]) {
    let nr = row+dr, nc = col+dc;
    while (inBounds(nr, nc)) {
      const p = b[nr][nc];
      if (p) {
        if (p.color === byColor && (p.type === "bishop" || p.type === "queen")) return true;
        break;
      }
      nr += dr; nc += dc;
    }
  }

  // King
  for (const [dr, dc] of [[-1,-1],[-1,0],[-1,1],[0,-1],[0,1],[1,-1],[1,0],[1,1]]) {
    const nr = row+dr, nc = col+dc;
    if (inBounds(nr, nc)) {
      const p = b[nr][nc];
      if (p && p.type === "king" && p.color === byColor) return true;
    }
  }

  return false;
}

function isInCheck(b: Board, color: Color): boolean {
  const kp = findKing(b, color);
  if (kp.row === -1) return false;
  return isSquareAttackedBy(b, kp, color === "white" ? "black" : "white");
}

// ─── Pseudo-legal move generation ─────────────────────────────────────────────

function pseudoLegalMoves(
  b: Board,
  pos: Position,
  ep: Position | null,
  cr: CastlingRights,
): Position[] {
  const piece = b[pos.row][pos.col];
  if (!piece) return [];

  const moves: Position[] = [];
  const { row, col } = pos;
  const color = piece.color;
  const enemy = color === "white" ? "black" : "white";

  // returns true if empty (can continue sliding)
  const push = (r: number, c: number): boolean => {
    if (!inBounds(r, c)) return false;
    const t = b[r][c];
    if (t && t.color === color) return false;
    moves.push({ row: r, col: c });
    return !t;
  };

  switch (piece.type) {
    case "pawn": {
      const dir = color === "white" ? -1 : 1;
      const startRow = color === "white" ? 6 : 1;
      // Forward 1
      if (inBounds(row+dir, col) && !b[row+dir][col]) {
        moves.push({ row: row+dir, col });
        // Forward 2 from start
        if (row === startRow && !b[row+2*dir][col])
          moves.push({ row: row+2*dir, col });
      }
      // Diagonal captures
      for (const dc of [-1, 1]) {
        const nr = row+dir, nc = col+dc;
        if (inBounds(nr, nc)) {
          const t = b[nr][nc];
          if (t && t.color === enemy) moves.push({ row: nr, col: nc });
          if (ep && posEq(ep, { row: nr, col: nc })) moves.push({ row: nr, col: nc });
        }
      }
      break;
    }
    case "knight":
      for (const [dr, dc] of [[-2,-1],[-2,1],[-1,-2],[-1,2],[1,-2],[1,2],[2,-1],[2,1]])
        push(row+dr, col+dc);
      break;
    case "bishop":
      for (const [dr, dc] of [[-1,-1],[-1,1],[1,-1],[1,1]]) {
        let nr = row+dr, nc = col+dc;
        while (push(nr, nc)) { nr += dr; nc += dc; }
      }
      break;
    case "rook":
      for (const [dr, dc] of [[-1,0],[1,0],[0,-1],[0,1]]) {
        let nr = row+dr, nc = col+dc;
        while (push(nr, nc)) { nr += dr; nc += dc; }
      }
      break;
    case "queen":
      for (const [dr, dc] of [[-1,-1],[-1,1],[1,-1],[1,1],[-1,0],[1,0],[0,-1],[0,1]]) {
        let nr = row+dr, nc = col+dc;
        while (push(nr, nc)) { nr += dr; nc += dc; }
      }
      break;
    case "king": {
      for (const [dr, dc] of [[-1,-1],[-1,0],[-1,1],[0,-1],[0,1],[1,-1],[1,0],[1,1]])
        push(row+dr, col+dc);
      // Castling
      const opp = enemy;
      if (color === "white" && row === 7 && col === 4) {
        if (cr.whiteKingSide && !b[7][5] && !b[7][6] &&
            !isSquareAttackedBy(b, {row:7,col:4}, opp) &&
            !isSquareAttackedBy(b, {row:7,col:5}, opp) &&
            !isSquareAttackedBy(b, {row:7,col:6}, opp))
          moves.push({ row:7, col:6 });
        if (cr.whiteQueenSide && !b[7][3] && !b[7][2] && !b[7][1] &&
            !isSquareAttackedBy(b, {row:7,col:4}, opp) &&
            !isSquareAttackedBy(b, {row:7,col:3}, opp) &&
            !isSquareAttackedBy(b, {row:7,col:2}, opp))
          moves.push({ row:7, col:2 });
      }
      if (color === "black" && row === 0 && col === 4) {
        if (cr.blackKingSide && !b[0][5] && !b[0][6] &&
            !isSquareAttackedBy(b, {row:0,col:4}, opp) &&
            !isSquareAttackedBy(b, {row:0,col:5}, opp) &&
            !isSquareAttackedBy(b, {row:0,col:6}, opp))
          moves.push({ row:0, col:6 });
        if (cr.blackQueenSide && !b[0][3] && !b[0][2] && !b[0][1] &&
            !isSquareAttackedBy(b, {row:0,col:4}, opp) &&
            !isSquareAttackedBy(b, {row:0,col:3}, opp) &&
            !isSquareAttackedBy(b, {row:0,col:2}, opp))
          moves.push({ row:0, col:2 });
      }
      break;
    }
  }
  return moves;
}

// ─── Apply move ───────────────────────────────────────────────────────────────

function applyMove(
  b: Board,
  from: Position,
  to: Position,
  ep: Position | null,
  cr: CastlingRights,
  promotionPiece?: PieceType,
): MoveResult {
  const nb = cloneBoard(b);
  const piece = nb[from.row][from.col]!;
  let captured: Piece | null = nb[to.row][to.col];
  let newEP: Position | null = null;
  const newCR = { ...cr };
  let castled: "kingSide" | "queenSide" | null = null;
  let promotion = false;

  // En passant capture
  if (piece.type === "pawn" && ep && posEq(to, ep)) {
    captured = nb[from.row][to.col];
    nb[from.row][to.col] = null;
  }

  // Castling
  if (piece.type === "king") {
    const dc = to.col - from.col;
    if (Math.abs(dc) === 2) {
      if (dc === 2) { nb[from.row][5] = nb[from.row][7]; nb[from.row][7] = null; castled = "kingSide"; }
      else          { nb[from.row][3] = nb[from.row][0]; nb[from.row][0] = null; castled = "queenSide"; }
    }
    if (piece.color === "white") { newCR.whiteKingSide = false; newCR.whiteQueenSide = false; }
    else                         { newCR.blackKingSide = false; newCR.blackQueenSide = false; }
  }

  // Revoke rook rights when rook moves
  if (piece.type === "rook") {
    if (from.row===7 && from.col===7) newCR.whiteKingSide = false;
    if (from.row===7 && from.col===0) newCR.whiteQueenSide = false;
    if (from.row===0 && from.col===7) newCR.blackKingSide = false;
    if (from.row===0 && from.col===0) newCR.blackQueenSide = false;
  }
  // Revoke rights when rook is captured
  if (to.row===7 && to.col===7) newCR.whiteKingSide = false;
  if (to.row===7 && to.col===0) newCR.whiteQueenSide = false;
  if (to.row===0 && to.col===7) newCR.blackKingSide = false;
  if (to.row===0 && to.col===0) newCR.blackQueenSide = false;

  // En passant target for double pawn push
  if (piece.type === "pawn" && Math.abs(to.row - from.row) === 2)
    newEP = { row: (from.row + to.row) / 2, col: from.col };

  // Move piece
  nb[to.row][to.col] = { ...piece };
  nb[from.row][from.col] = null;

  // Promotion
  const promRow = piece.color === "white" ? 0 : 7;
  if (piece.type === "pawn" && to.row === promRow) {
    promotion = true;
    if (promotionPiece) nb[to.row][to.col] = makePiece(promotionPiece, piece.color);
  }

  return { board: nb, enPassantTarget: newEP, castlingRights: newCR, captured, promotion, castled };
}

// ─── Legal move filtering ─────────────────────────────────────────────────────

function legalMovesFor(b: Board, pos: Position, ep: Position | null, cr: CastlingRights): Position[] {
  const piece = b[pos.row][pos.col];
  if (!piece) return [];
  const color = piece.color;
  return pseudoLegalMoves(b, pos, ep, cr).filter(to => {
    const r = applyMove(b, pos, to, ep, cr, "queen");
    return !isInCheck(r.board, color);
  });
}

function hasLegalMove(b: Board, color: Color, ep: Position | null, cr: CastlingRights): boolean {
  for (let r = 0; r < 8; r++)
    for (let c = 0; c < 8; c++) {
      const p = b[r][c];
      if (p && p.color === color && legalMovesFor(b, {row:r,col:c}, ep, cr).length > 0) return true;
    }
  return false;
}

// ─── Algebraic notation ───────────────────────────────────────────────────────

const PIECE_LETTER: Record<PieceType, string> = {
  king:"R", queen:"D", rook:"T", bishop:"B", knight:"C", pawn:""
};

function toAlgebraic(
  b: Board,
  from: Position,
  to: Position,
  captured: Piece | null,
  castled: "kingSide" | "queenSide" | null,
  check: boolean,
  checkmate: boolean,
  promoteTo?: PieceType,
): string {
  const sfx = checkmate ? "#" : check ? "+" : "";
  if (castled === "kingSide")  return "O-O" + sfx;
  if (castled === "queenSide") return "O-O-O" + sfx;

  const piece = b[from.row][from.col];
  if (!piece) return "";
  const dest = FILE_LABELS[to.col] + (8 - to.row);

  if (piece.type === "pawn") {
    const base = captured ? FILE_LABELS[from.col] + "x" + dest : dest;
    return base + (promoteTo ? "=" + PIECE_LETTER[promoteTo] : "") + sfx;
  }
  return PIECE_LETTER[piece.type] + (captured ? "x" : "") + dest + sfx;
}

// ─── Position hash (repetition) ───────────────────────────────────────────────

function posHash(b: Board, turn: Color, ep: Position | null, cr: CastlingRights): string {
  const rows = b.map(row => row.map(sq => sq ? sq.type[0]+sq.color[0] : "..").join("")).join("|");
  const epStr = ep ? `${ep.row}${ep.col}` : "-";
  const crStr = (cr.whiteKingSide?"K":"")+(cr.whiteQueenSide?"Q":"")+(cr.blackKingSide?"k":"")+(cr.blackQueenSide?"q":"");
  return `${rows}|${turn}|${epStr}|${crStr}`;
}

// ─── Initial state ────────────────────────────────────────────────────────────

function makeInitialState(): GameState {
  const board = createInitialBoard();
  const cr: CastlingRights = { whiteKingSide:true, whiteQueenSide:true, blackKingSide:true, blackQueenSide:true };
  return {
    board,
    currentTurn: "white",
    selectedSquare: null,
    legalMoves: [],
    enPassantTarget: null,
    castlingRights: cr,
    capturedWhite: [],
    capturedBlack: [],
    moveHistory: [],
    isCheck: false,
    isCheckmate: false,
    isStalemate: false,
    winner: null,
    halfMoveClock: 0,
    fullMoveNumber: 1,
    positionHistory: [posHash(board, "white", null, cr)],
    isDraw: false,
    drawReason: "",
    boardHistory: [],
    promotionPending: null,
  };
}

// ─── Resolve a completed move into next GameState ─────────────────────────────

function resolveCompletedMove(
  prev: GameState,
  from: Position,
  to: Position,
  result: MoveResult,
  promoteTo?: PieceType,
): GameState {
  const nextTurn: Color = prev.currentTurn === "white" ? "black" : "white";

  // Apply promotion piece if provided
  let finalBoard = result.board;
  if (promoteTo && result.promotion) {
    finalBoard = cloneBoard(result.board);
    finalBoard[to.row][to.col] = makePiece(promoteTo, prev.currentTurn);
  }

  // Update captured pieces
  let capW = [...prev.capturedWhite];
  let capB = [...prev.capturedBlack];
  if (result.captured) {
    if (result.captured.color === "white") capW = [...capW, result.captured];
    else capB = [...capB, result.captured];
  }

  // Check / checkmate / stalemate
  const check = isInCheck(finalBoard, nextTurn);
  const canMove = hasLegalMove(finalBoard, nextTurn, result.enPassantTarget, result.castlingRights);
  const checkmate = check && !canMove;
  const stalemate = !check && !canMove;

  // Fifty-move rule
  const piece = prev.board[from.row][from.col];
  const isPawn = piece?.type === "pawn";
  const isCapture = !!result.captured;
  const newHalfClock = (isPawn || isCapture) ? 0 : prev.halfMoveClock + 1;

  // Repetition
  const hash = posHash(finalBoard, nextTurn, result.enPassantTarget, result.castlingRights);
  const newPosHist = [...prev.positionHistory, hash];
  const reps = newPosHist.filter(h => h === hash).length;

  let isDraw = false;
  let drawReason = "";
  if (newHalfClock >= 100)    { isDraw = true; drawReason = "Regra dos 50 movimentos"; }
  if (reps >= 3)               { isDraw = true; drawReason = "Repetição de posição"; }
  if (stalemate)               { isDraw = true; drawReason = "Afogamento"; }

  // Insufficient material
  const pieces: Piece[] = [];
  for (const row of finalBoard) for (const sq of row) if (sq) pieces.push(sq);
  const nonKings = pieces.filter(p => p.type !== "king");
  if (nonKings.length === 0) { isDraw = true; drawReason = "Material insuficiente"; }
  if (nonKings.length === 1 && (nonKings[0].type === "bishop" || nonKings[0].type === "knight"))
    { isDraw = true; drawReason = "Material insuficiente"; }

  // Notation
  const notation = toAlgebraic(prev.board, from, to, result.captured, result.castled, check, checkmate, promoteTo);
  const prefix = prev.currentTurn === "white" ? `${prev.fullMoveNumber}. ` : "";
  const newMoveHist = [...prev.moveHistory, prefix + notation];

  // Undo snapshot
  const snapshot: HistorySnapshot = {
    board: prev.board,
    currentTurn: prev.currentTurn,
    enPassantTarget: prev.enPassantTarget,
    castlingRights: prev.castlingRights,
    capturedWhite: prev.capturedWhite,
    capturedBlack: prev.capturedBlack,
    moveHistory: prev.moveHistory,
    halfMoveClock: prev.halfMoveClock,
    fullMoveNumber: prev.fullMoveNumber,
    positionHistory: prev.positionHistory,
    isCheck: prev.isCheck,
  };

  return {
    ...prev,
    board: finalBoard,
    currentTurn: nextTurn,
    selectedSquare: null,
    legalMoves: [],
    enPassantTarget: result.enPassantTarget,
    castlingRights: result.castlingRights,
    capturedWhite: capW,
    capturedBlack: capB,
    moveHistory: newMoveHist,
    isCheck: check,
    isCheckmate: checkmate,
    isStalemate: stalemate,
    winner: checkmate ? prev.currentTurn : null,
    halfMoveClock: newHalfClock,
    fullMoveNumber: prev.currentTurn === "black" ? prev.fullMoveNumber + 1 : prev.fullMoveNumber,
    positionHistory: newPosHist,
    isDraw,
    drawReason,
    boardHistory: [...prev.boardHistory, snapshot],
    promotionPending: null,
  };
}

// ─── Captured pieces component ────────────────────────────────────────────────

function CapturedPieces({ pieces, color }: { pieces: Piece[]; color: Color }) {
  const sorted = [...pieces].sort((a, b) => PIECE_VALUES[b.type] - PIECE_VALUES[a.type]);
  if (sorted.length === 0) return <div className="h-7" />;
  return (
    <div className="flex flex-wrap gap-0.5 min-h-7">
      {sorted.map(p => (
        <span
          key={p.id}
          style={{
            fontSize: "1.15rem",
            lineHeight: 1,
            color: p.color === "white" ? "#ffffff" : "#111111",
            textShadow: p.color === "white"
              ? "0 0 2px #000"
              : "0 0 1px rgba(255,255,255,0.4)",
          }}
        >
          {UNICODE_PIECES[p.type][p.color]}
        </span>
      ))}
    </div>
  );
}

// ─── Main component ───────────────────────────────────────────────────────────

export default function ChessPage() {
  const [game, setGame] = useState<GameState>(makeInitialState);
  const moveListRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (moveListRef.current)
      moveListRef.current.scrollTop = moveListRef.current.scrollHeight;
  }, [game.moveHistory.length]);

  const handleSquareClick = useCallback((row: number, col: number) => {
    setGame(prev => {
      if (prev.isCheckmate || prev.isStalemate || prev.isDraw || prev.promotionPending) return prev;

      const pos: Position = { row, col };
      const clickedPiece = prev.board[row][col];

      if (prev.selectedSquare) {
        const isLegal = prev.legalMoves.some(m => posEq(m, pos));

        if (isLegal) {
          const result = applyMove(prev.board, prev.selectedSquare, pos, prev.enPassantTarget, prev.castlingRights);

          // Promotion — pause and ask user
          if (result.promotion) {
            return {
              ...prev,
              selectedSquare: null,
              legalMoves: [],
              promotionPending: { from: prev.selectedSquare, to: pos, result },
            };
          }

          return resolveCompletedMove(prev, prev.selectedSquare, pos, result);
        }

        // Reselect own piece
        if (clickedPiece && clickedPiece.color === prev.currentTurn) {
          const newLegal = legalMovesFor(prev.board, pos, prev.enPassantTarget, prev.castlingRights);
          return { ...prev, selectedSquare: pos, legalMoves: newLegal };
        }

        // Deselect
        return { ...prev, selectedSquare: null, legalMoves: [] };
      }

      // Select own piece
      if (clickedPiece && clickedPiece.color === prev.currentTurn) {
        const newLegal = legalMovesFor(prev.board, pos, prev.enPassantTarget, prev.castlingRights);
        return { ...prev, selectedSquare: pos, legalMoves: newLegal };
      }

      return prev;
    });
  }, []);

  const handlePromotion = useCallback((pieceType: PieceType) => {
    setGame(prev => {
      if (!prev.promotionPending) return prev;
      const { from, to, result } = prev.promotionPending;
      return resolveCompletedMove(prev, from, to, result, pieceType);
    });
  }, []);

  const handleUndo = useCallback(() => {
    setGame(prev => {
      if (prev.boardHistory.length === 0) return prev;
      const snap = prev.boardHistory[prev.boardHistory.length - 1];
      return {
        ...prev,
        board: snap.board,
        currentTurn: snap.currentTurn,
        enPassantTarget: snap.enPassantTarget,
        castlingRights: snap.castlingRights,
        capturedWhite: snap.capturedWhite,
        capturedBlack: snap.capturedBlack,
        moveHistory: snap.moveHistory,
        halfMoveClock: snap.halfMoveClock,
        fullMoveNumber: snap.fullMoveNumber,
        positionHistory: snap.positionHistory,
        isCheck: snap.isCheck,
        isCheckmate: false,
        isStalemate: false,
        winner: null,
        isDraw: false,
        drawReason: "",
        selectedSquare: null,
        legalMoves: [],
        promotionPending: null,
        boardHistory: prev.boardHistory.slice(0, -1),
      };
    });
  }, []);

  const handleNewGame = useCallback(() => setGame(makeInitialState()), []);

  const kingPos = game.isCheck ? findKing(game.board, game.currentTurn) : null;

  // Group moves into pairs for display
  const movePairs: [string, string?][] = [];
  for (let i = 0; i < game.moveHistory.length; i += 2)
    movePairs.push([game.moveHistory[i], game.moveHistory[i + 1]]);

  const gameOver = game.isCheckmate || game.isDraw;

  return (
    <div
      className="min-h-screen flex flex-col items-center justify-start py-6 px-4"
      style={{ background: "linear-gradient(135deg, #0f0f1e 0%, #1a1a2e 50%, #16213e 100%)" }}
    >
      {/* Header */}
      <div className="mb-5 text-center">
        <h1 className="text-3xl font-bold tracking-wide" style={{ color: "#f0d9b5" }}>
          ♟ Xadrez
        </h1>
        <p className="text-sm mt-1" style={{ color: "#b58863" }}>Descomplicai</p>
      </div>

      <div className="flex flex-col xl:flex-row gap-5 w-full max-w-5xl items-start justify-center">

        {/* ── Left panel ── */}
        <div className="flex flex-col gap-4 w-full xl:w-52 order-2 xl:order-1 shrink-0">

          {/* Turn / status */}
          <motion.div
            layout
            className="rounded-2xl p-4 text-center font-semibold border-2 transition-colors duration-300"
            style={{
              background: "#16213e",
              borderColor: gameOver ? "#4a9eff"
                : game.currentTurn === "white" ? "#f0d9b5" : "#b58863",
            }}
          >
            {game.isCheckmate ? (
              <>
                <div className="text-4xl mb-2">{game.winner === "white" ? "♔" : "♚"}</div>
                <div style={{ color: "#f0d9b5", fontSize: "1.1rem" }}>
                  {game.winner === "white" ? "Brancas vencem!" : "Pretas vencem!"}
                </div>
                <div className="text-sm mt-1" style={{ color: "#b58863" }}>Xeque-mate</div>
              </>
            ) : game.isDraw ? (
              <>
                <div className="text-3xl mb-2">⚖️</div>
                <div style={{ color: "#f0d9b5", fontSize: "1.1rem" }}>Empate</div>
                <div className="text-sm mt-1" style={{ color: "#b58863" }}>{game.drawReason}</div>
              </>
            ) : (
              <>
                <div className="text-4xl mb-2">
                  {game.currentTurn === "white" ? "♔" : "♚"}
                </div>
                <div style={{ color: game.currentTurn === "white" ? "#f0d9b5" : "#e8c88a", fontSize: "1.05rem" }}>
                  Vez das {game.currentTurn === "white" ? "Brancas" : "Pretas"}
                </div>
                <AnimatePresence>
                  {game.isCheck && (
                    <motion.div
                      initial={{ opacity: 0, y: -6 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -6 }}
                      className="mt-2 font-bold text-sm"
                      style={{ color: "#f87171" }}
                    >
                      ⚠ Xeque!
                    </motion.div>
                  )}
                </AnimatePresence>
              </>
            )}
          </motion.div>

          {/* Captured pieces */}
          <div className="rounded-2xl p-3 border" style={{ background: "#16213e", borderColor: "#2a2a4e" }}>
            <div className="text-xs uppercase tracking-widest mb-3" style={{ color: "#b58863" }}>
              Capturadas
            </div>
            <div className="mb-3">
              <div className="text-xs mb-1" style={{ color: "#666" }}>Brancas capturaram</div>
              <CapturedPieces pieces={game.capturedBlack} color="black" />
            </div>
            <div>
              <div className="text-xs mb-1" style={{ color: "#666" }}>Pretas capturaram</div>
              <CapturedPieces pieces={game.capturedWhite} color="white" />
            </div>
          </div>

          {/* Buttons */}
          <button
            onClick={handleUndo}
            disabled={game.boardHistory.length === 0 || !!game.promotionPending}
            className="w-full py-2.5 px-4 rounded-xl font-medium text-sm transition-all disabled:opacity-40 disabled:cursor-not-allowed"
            style={{
              background: "#2a2a4e",
              color: "#f0d9b5",
              border: "1px solid #3a3a6e",
            }}
            onMouseEnter={e => { (e.currentTarget as HTMLButtonElement).style.background = "#3a3a6e"; }}
            onMouseLeave={e => { (e.currentTarget as HTMLButtonElement).style.background = "#2a2a4e"; }}
          >
            ↩ Desfazer jogada
          </button>
          <button
            onClick={handleNewGame}
            className="w-full py-2.5 px-4 rounded-xl font-medium text-sm text-white transition-all"
            style={{ background: "#b58863" }}
            onMouseEnter={e => { (e.currentTarget as HTMLButtonElement).style.background = "#c9a07a"; }}
            onMouseLeave={e => { (e.currentTarget as HTMLButtonElement).style.background = "#b58863"; }}
          >
            ✦ Novo jogo
          </button>
        </div>

        {/* ── Board ── */}
        <div className="order-1 xl:order-2 flex flex-col items-center shrink-0">
          {/* File labels top */}
          <div className="flex mb-1" style={{ paddingLeft: "1.5rem", width: "min(90vw, 544px)" }}>
            {FILE_LABELS.map(f => (
              <div key={f} className="flex-1 text-center text-xs font-medium" style={{ color: "#b58863" }}>{f}</div>
            ))}
          </div>

          <div className="flex items-stretch">
            {/* Rank labels left */}
            <div className="flex flex-col mr-1" style={{ width: "1.2rem" }}>
              {Array.from({ length: 8 }, (_, i) => (
                <div
                  key={i}
                  className="flex-1 flex items-center justify-end text-xs font-medium"
                  style={{ color: "#b58863" }}
                >
                  {8 - i}
                </div>
              ))}
            </div>

            {/* The board */}
            <div
              className="grid grid-cols-8"
              style={{
                width: "min(90vw, 544px)",
                height: "min(90vw, 544px)",
                border: "3px solid #8b6914",
                boxShadow: "0 20px 60px rgba(0,0,0,0.6), 0 0 0 1px rgba(181,136,99,0.3)",
              }}
            >
              {game.board.map((rowArr, r) =>
                rowArr.map((piece, c) => {
                  const isLight = (r + c) % 2 === 0;
                  const isSel = game.selectedSquare ? posEq(game.selectedSquare, {row:r,col:c}) : false;
                  const isLegal = game.legalMoves.some(m => posEq(m, {row:r,col:c}));
                  const isCapture = isLegal && (!!game.board[r][c] || (game.enPassantTarget ? posEq(game.enPassantTarget, {row:r,col:c}) : false));
                  const isKingCheck = kingPos ? posEq(kingPos, {row:r,col:c}) : false;

                  let bg = isLight ? LIGHT_SQUARE : DARK_SQUARE;
                  if (isSel) bg = "#afd46e";

                  return (
                    <div
                      key={`${r}-${c}`}
                      onClick={() => handleSquareClick(r, c)}
                      className="relative flex items-center justify-center cursor-pointer"
                      style={{
                        backgroundColor: bg,
                        boxShadow: isKingCheck
                          ? "inset 0 0 0 3px #ef4444, inset 0 0 16px rgba(239,68,68,0.55)"
                          : undefined,
                        userSelect: "none",
                      }}
                    >
                      {/* Legal move dot */}
                      {isLegal && !isCapture && (
                        <div
                          className="absolute rounded-full pointer-events-none z-10"
                          style={{
                            width: "34%",
                            height: "34%",
                            backgroundColor: "rgba(0,0,0,0.22)",
                          }}
                        />
                      )}

                      {/* Capture ring */}
                      {isCapture && (
                        <div
                          className="absolute inset-0 pointer-events-none z-10"
                          style={{ border: "5px solid rgba(0,0,0,0.28)", boxSizing: "border-box" }}
                        />
                      )}

                      {/* Piece */}
                      <AnimatePresence mode="popLayout">
                        {piece && (
                          <motion.span
                            key={piece.id}
                            initial={{ scale: 0.65, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            exit={{ scale: 0.4, opacity: 0 }}
                            transition={{ type: "spring", stiffness: 420, damping: 26 }}
                            className="absolute inset-0 flex items-center justify-center z-20 pointer-events-none"
                            style={{
                              fontSize: "clamp(20px, 5.8vw, 42px)",
                              lineHeight: 1,
                              color: piece.color === "white" ? "#ffffff" : "#111111",
                              filter: piece.color === "white"
                                ? "drop-shadow(0 1px 3px rgba(0,0,0,0.75))"
                                : "drop-shadow(0 1px 2px rgba(255,255,255,0.15))",
                              textShadow: piece.color === "white"
                                ? "0 0 3px rgba(0,0,0,0.9), 0 1px 4px rgba(0,0,0,0.8)"
                                : "none",
                            }}
                          >
                            {UNICODE_PIECES[piece.type][piece.color]}
                          </motion.span>
                        )}
                      </AnimatePresence>
                    </div>
                  );
                })
              )}
            </div>

            {/* Rank labels right */}
            <div className="flex flex-col ml-1" style={{ width: "1.2rem" }}>
              {Array.from({ length: 8 }, (_, i) => (
                <div
                  key={i}
                  className="flex-1 flex items-center text-xs font-medium"
                  style={{ color: "#b58863" }}
                >
                  {8 - i}
                </div>
              ))}
            </div>
          </div>

          {/* File labels bottom */}
          <div className="flex mt-1" style={{ paddingLeft: "1.5rem", width: "min(90vw, 544px)" }}>
            {FILE_LABELS.map(f => (
              <div key={f} className="flex-1 text-center text-xs font-medium" style={{ color: "#b58863" }}>{f}</div>
            ))}
          </div>
        </div>

        {/* ── Right panel — history ── */}
        <div className="flex flex-col gap-4 w-full xl:w-52 order-3 shrink-0">

          <div
            className="rounded-2xl p-3 border flex flex-col"
            style={{ background: "#16213e", borderColor: "#2a2a4e" }}
          >
            <div className="text-xs uppercase tracking-widest mb-3" style={{ color: "#b58863" }}>
              Histórico de jogadas
            </div>
            <div
              ref={moveListRef}
              className="overflow-y-auto"
              style={{ maxHeight: "400px" }}
            >
              {movePairs.length === 0 ? (
                <div className="text-sm text-center py-6" style={{ color: "#444" }}>
                  Nenhuma jogada
                </div>
              ) : (
                <table className="w-full text-sm border-collapse">
                  <tbody>
                    {movePairs.map(([white, black], i) => (
                      <tr
                        key={i}
                        style={{ background: i % 2 === 0 ? "rgba(255,255,255,0.03)" : "transparent" }}
                      >
                        <td className="py-0.5 px-1 text-right w-7" style={{ color: "#555", fontSize: "0.75rem" }}>
                          {i + 1}.
                        </td>
                        <td className="py-0.5 px-2 font-mono" style={{ color: "#f0d9b5" }}>
                          {white.replace(/^\d+\.\s/, "")}
                        </td>
                        <td className="py-0.5 px-2 font-mono" style={{ color: "#c8a870" }}>
                          {black?.replace(/^\d+\.\s/, "") ?? ""}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              )}
            </div>
          </div>

          <div
            className="rounded-2xl p-3 border text-center"
            style={{ background: "#16213e", borderColor: "#2a2a4e" }}
          >
            <div className="text-xs uppercase tracking-widest" style={{ color: "#b58863" }}>Jogadas</div>
            <div className="text-2xl font-bold mt-1" style={{ color: "#f0d9b5" }}>
              {game.moveHistory.length}
            </div>
          </div>
        </div>

      </div>

      {/* ── Promotion modal ── */}
      <AnimatePresence>
        {game.promotionPending && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 flex items-center justify-center z-50"
            style={{ background: "rgba(0,0,0,0.75)" }}
          >
            <motion.div
              initial={{ scale: 0.75, opacity: 0, y: 24 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.75, opacity: 0, y: 24 }}
              transition={{ type: "spring", stiffness: 340, damping: 22 }}
              className="rounded-2xl p-7 text-center"
              style={{
                background: "#1a1a2e",
                border: "2px solid #b58863",
                boxShadow: "0 24px 80px rgba(0,0,0,0.7)",
              }}
            >
              <div className="text-lg font-semibold mb-5" style={{ color: "#f0d9b5" }}>
                Promover peão
              </div>
              <div className="flex gap-3 justify-center">
                {(["queen","rook","bishop","knight"] as PieceType[]).map(type => {
                  const col = game.currentTurn;
                  return (
                    <button
                      key={type}
                      onClick={() => handlePromotion(type)}
                      className="flex flex-col items-center gap-2 p-3 rounded-xl transition-all"
                      style={{
                        background: "#16213e",
                        border: "1px solid #3a3a6e",
                        minWidth: "72px",
                      }}
                      onMouseEnter={e => {
                        (e.currentTarget as HTMLButtonElement).style.borderColor = "#b58863";
                        (e.currentTarget as HTMLButtonElement).style.background = "#2a2a4e";
                      }}
                      onMouseLeave={e => {
                        (e.currentTarget as HTMLButtonElement).style.borderColor = "#3a3a6e";
                        (e.currentTarget as HTMLButtonElement).style.background = "#16213e";
                      }}
                    >
                      <span
                        style={{
                          fontSize: "2.8rem",
                          lineHeight: 1,
                          color: col === "white" ? "#ffffff" : "#111111",
                          textShadow: col === "white" ? "0 0 3px rgba(0,0,0,0.9)" : "none",
                          filter: col === "white"
                            ? "drop-shadow(0 1px 3px rgba(0,0,0,0.7))"
                            : "drop-shadow(0 1px 2px rgba(255,255,255,0.2))",
                        }}
                      >
                        {UNICODE_PIECES[type][col]}
                      </span>
                      <span className="text-xs" style={{ color: "#b58863" }}>
                        {type === "queen" ? "Rainha" : type === "rook" ? "Torre" : type === "bishop" ? "Bispo" : "Cavalo"}
                      </span>
                    </button>
                  );
                })}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── Game over overlay ── */}
      <AnimatePresence>
        {gameOver && !game.promotionPending && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 flex items-center justify-center z-40"
            style={{ background: "rgba(0,0,0,0.62)", pointerEvents: "none" }}
          >
            <motion.div
              initial={{ scale: 0.55, opacity: 0, y: 40 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.55, opacity: 0 }}
              transition={{ type: "spring", stiffness: 280, damping: 20, delay: 0.15 }}
              className="rounded-2xl p-9 text-center mx-4"
              style={{
                background: "#1a1a2e",
                border: "2px solid #b58863",
                boxShadow: "0 32px 100px rgba(0,0,0,0.75)",
                maxWidth: "360px",
                pointerEvents: "auto",
              }}
            >
              {game.isCheckmate ? (
                <>
                  <div style={{ fontSize: "5rem", lineHeight: 1, marginBottom: "1rem" }}>
                    {game.winner === "white" ? "♔" : "♚"}
                  </div>
                  <div className="text-2xl font-bold mb-2" style={{ color: "#f0d9b5" }}>
                    {game.winner === "white" ? "Brancas vencem!" : "Pretas vencem!"}
                  </div>
                  <div className="text-base mb-1" style={{ color: "#b58863" }}>Xeque-mate</div>
                </>
              ) : (
                <>
                  <div style={{ fontSize: "4rem", lineHeight: 1, marginBottom: "1rem" }}>⚖️</div>
                  <div className="text-2xl font-bold mb-2" style={{ color: "#f0d9b5" }}>Empate</div>
                  <div className="text-base mb-1" style={{ color: "#b58863" }}>{game.drawReason}</div>
                </>
              )}
              <div className="text-sm mb-6" style={{ color: "#666" }}>
                {game.moveHistory.length} jogadas no total
              </div>
              <button
                onClick={handleNewGame}
                className="w-full py-3 px-6 rounded-xl font-semibold text-lg text-white transition-all"
                style={{ background: "#b58863" }}
                onMouseEnter={e => { (e.currentTarget as HTMLButtonElement).style.background = "#c9a07a"; }}
                onMouseLeave={e => { (e.currentTarget as HTMLButtonElement).style.background = "#b58863"; }}
              >
                ✦ Novo jogo
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
