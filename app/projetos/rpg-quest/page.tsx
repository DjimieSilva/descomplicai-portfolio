"use client";

import React, { useCallback, useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

/* ================================================================
   DESCOMPLICAI RPG: THE QUEST
   A full 2D top-down RPG portfolio explorer
   15 NPCs, 8 Quests, 10 Chests, 5 Zones, 60x45 tile map
   Canvas 2D rendering, save/load, mobile touch controls
   All dialogue in Portuguese (PT-PT)
   ================================================================ */

/* SECTION 1: CONSTANTS AND TYPES */
const GRASS=0,WATER=1,PATH=2,WALL=3,SAND=4,FLOOR=5,DOOR=6,BRIDGE=7,TREE=8,FLOWER=9,ROCK=10;
type TT=0|1|2|3|4|5|6|7|8|9|10;
const G=GRASS,W=WATER,P=PATH,X=WALL,S=SAND,F=FLOOR,D=DOOR,BB=BRIDGE,TR=TREE,FL=FLOWER,RK=ROCK;
const MC=60,MR=45,TP=16,SC=2,RT=TP*SC;
const PS=2.5,SM=1.5,CL=0.08,ID=1.5*TP,TS=1.8,MP=100,AS=30000;
const SK="descomplicai_rpg_v2";
const DD=0,DL=1,DR=2,DU=3;
type ZI="centro"|"restaurantes"|"clinicas"|"lab"|"torre";
const ZN:Record<ZI,string>={centro:"Centro Hub",restaurantes:"Vila dos Restaurantes",clinicas:"Distrito das Clinicas",lab:"Laboratorio Tech",torre:"Torre do Portfolio"};
const ZB:{id:ZI;c0:number;c1:number;r0:number;r1:number;color:string}[]=[
{id:"centro",c0:20,c1:40,r0:15,r1:30,color:"#4ade80"},
{id:"restaurantes",c0:42,c1:58,r0:10,r1:35,color:"#f97316"},
{id:"clinicas",c0:2,c1:18,r0:10,r1:35,color:"#06b6d4"},
{id:"lab",c0:15,c1:45,r0:1,r1:13,color:"#a855f7"},
{id:"torre",c0:20,c1:40,r0:32,r1:44,color:"#eab308"},
];
function gZ(c:number,r:number):ZI|null{for(const z of ZB){if(c>=z.c0&&c<=z.c1&&r>=z.r0&&r<=z.r1)return z.id;}return null;}

/* SECTION 2: 60x45 TILE MAP */
// prettier-ignore
const GM:TT[][]=[
[TR,TR,TR,TR,TR,TR,TR,TR,TR,TR,TR,TR,TR,TR,TR,TR,TR,TR,TR,TR,TR,TR,TR,TR,TR,TR,TR,TR,TR,TR,TR,TR,TR,TR,TR,TR,TR,TR,TR,TR,TR,TR,TR,TR,TR,TR,TR,TR,TR,TR,TR,TR,TR,TR,TR,TR,TR,TR,TR,TR],
[TR,TR,TR,TR,TR,TR,TR,TR,TR,TR,TR,TR,TR,TR,TR,G,G,P,P,P,P,P,P,P,P,P,P,P,P,P,P,P,P,P,P,P,P,P,P,P,P,P,P,P,P,G,TR,TR,TR,TR,TR,TR,TR,TR,TR,TR,TR,TR,TR,TR],
[TR,TR,TR,TR,TR,TR,TR,TR,TR,TR,TR,TR,TR,TR,G,G,P,X,X,X,X,D,X,X,G,FL,G,X,X,X,D,X,X,G,FL,G,X,X,X,D,X,X,G,G,P,G,TR,TR,TR,TR,TR,TR,TR,TR,TR,TR,TR,TR,TR,TR],
[TR,TR,TR,TR,TR,TR,TR,TR,TR,TR,TR,TR,TR,TR,G,P,P,X,F,F,F,F,F,X,G,G,G,X,F,F,F,F,F,X,G,G,X,F,F,F,F,F,X,G,P,G,TR,TR,TR,TR,TR,TR,TR,TR,TR,TR,TR,TR,TR,TR],
[TR,TR,TR,TR,TR,TR,TR,TR,TR,TR,TR,TR,TR,TR,G,P,P,X,F,F,F,F,F,X,G,FL,G,X,F,F,F,F,F,X,G,G,X,F,F,F,F,F,X,G,P,G,TR,TR,TR,TR,TR,TR,TR,TR,TR,TR,TR,TR,TR,TR],
[TR,TR,TR,TR,TR,TR,TR,TR,TR,TR,TR,TR,TR,TR,G,P,P,X,X,X,X,X,X,X,G,G,G,X,X,X,X,X,X,X,G,G,X,X,X,X,X,X,X,G,P,G,TR,TR,TR,TR,TR,TR,TR,TR,TR,TR,TR,TR,TR,TR],
[TR,TR,TR,TR,TR,TR,TR,TR,TR,TR,TR,TR,TR,TR,G,P,P,P,P,P,P,P,P,P,P,P,P,P,P,P,P,P,P,P,P,P,P,P,P,P,P,P,P,P,P,G,TR,TR,TR,TR,TR,TR,TR,TR,TR,TR,TR,TR,TR,TR],
[TR,TR,TR,TR,TR,TR,TR,TR,TR,TR,TR,TR,TR,TR,G,P,G,X,X,X,D,X,X,G,FL,G,P,G,X,X,D,X,X,G,G,G,G,G,G,G,G,G,G,G,P,G,TR,TR,TR,TR,TR,TR,TR,TR,TR,TR,TR,TR,TR,TR],
[TR,TR,TR,TR,TR,TR,TR,TR,TR,TR,TR,TR,TR,TR,G,P,G,X,F,F,F,F,X,G,G,G,P,G,X,F,F,F,X,G,FL,G,G,FL,G,G,FL,G,G,G,P,G,TR,TR,TR,TR,TR,TR,TR,TR,TR,TR,TR,TR,TR,TR],
[TR,TR,TR,TR,TR,TR,TR,TR,TR,TR,TR,TR,TR,TR,G,P,G,X,X,X,X,X,X,G,G,G,P,G,X,X,X,X,X,G,G,G,G,G,G,G,G,G,G,G,P,G,TR,TR,TR,TR,TR,TR,TR,TR,TR,TR,TR,TR,TR,TR],
[TR,TR,TR,G,G,G,G,G,G,G,G,G,G,G,G,P,P,P,P,P,P,P,P,P,P,P,P,P,P,P,P,P,P,P,P,P,P,P,P,P,P,P,P,P,P,G,G,G,G,G,G,G,G,G,G,G,G,G,TR,TR],
[TR,TR,G,G,FL,G,G,G,G,G,G,G,G,G,G,G,TR,TR,TR,TR,G,G,G,G,G,G,G,G,G,G,G,G,G,G,G,G,G,G,G,G,TR,TR,TR,TR,G,G,G,G,G,G,G,G,G,FL,G,G,G,G,TR,TR],
[TR,TR,G,P,P,P,P,P,P,P,P,P,G,G,G,G,TR,TR,W,W,G,G,G,G,G,G,G,G,G,G,G,G,G,G,G,G,G,G,G,G,W,W,TR,TR,G,G,G,P,P,P,P,P,P,P,P,G,G,G,TR,TR],
[TR,TR,G,P,X,X,X,D,X,X,G,P,G,G,W,W,W,W,W,W,G,G,G,G,G,G,G,G,G,G,G,G,G,G,G,G,G,G,G,G,W,W,W,W,W,G,G,P,X,X,D,X,X,X,P,G,G,G,TR,TR],
[TR,TR,G,P,X,F,F,F,F,X,G,P,G,W,W,W,W,W,W,W,G,G,FL,G,G,G,G,G,G,G,G,G,G,G,FL,G,G,G,G,G,W,W,W,W,W,G,G,P,X,F,F,F,F,X,P,G,G,G,TR,TR],
[TR,TR,G,P,X,F,F,F,F,X,G,P,G,W,W,W,W,BB,BB,W,G,G,G,G,P,P,P,P,P,P,P,P,P,P,G,G,G,G,G,G,W,BB,BB,W,W,G,G,P,X,F,F,F,F,X,P,G,G,G,TR,TR],
[TR,TR,G,P,X,X,X,X,X,X,G,P,G,G,W,W,W,BB,BB,W,G,P,P,P,P,FL,G,G,G,G,G,G,FL,P,P,P,G,G,G,G,W,BB,BB,W,W,G,G,P,X,X,X,X,X,X,P,G,G,G,TR,TR],
[TR,TR,G,P,P,P,P,P,P,P,G,P,G,G,G,W,W,BB,BB,G,G,P,G,G,G,G,FL,G,G,G,G,FL,G,G,G,P,G,G,G,G,G,BB,BB,W,G,G,G,P,P,P,P,P,P,P,P,G,G,G,TR,TR],
[TR,TR,G,P,X,X,D,X,X,G,G,P,G,G,G,G,W,BB,BB,G,G,P,G,G,RK,G,G,G,G,G,G,G,G,RK,G,P,G,G,G,G,G,BB,BB,G,G,G,G,P,G,X,X,D,X,X,X,P,G,G,TR,TR],
[TR,TR,G,P,X,F,F,F,X,G,G,P,G,G,G,G,G,BB,BB,G,G,P,G,G,G,G,G,W,W,W,W,G,G,G,G,P,G,G,G,G,G,BB,BB,G,G,G,G,P,G,X,F,F,F,F,X,P,G,G,TR,TR],
[TR,TR,G,P,X,F,F,F,X,G,G,P,G,G,G,G,G,G,P,G,G,P,G,G,G,G,W,W,W,W,W,W,G,G,G,P,G,G,G,G,G,P,G,G,G,G,G,P,G,X,F,F,F,F,X,P,G,G,TR,TR],
[TR,TR,G,P,X,X,X,X,X,G,G,P,G,FL,G,G,G,G,P,G,G,P,G,FL,G,G,W,W,W,W,W,W,G,G,FL,P,G,G,G,G,G,P,G,G,FL,G,G,P,G,X,X,X,X,X,X,P,G,G,TR,TR],
[TR,TR,G,P,P,P,P,P,P,P,P,P,G,G,G,G,G,G,P,G,G,P,G,G,G,G,W,W,W,W,W,W,G,G,G,P,G,G,G,G,G,P,G,G,G,G,G,P,P,P,P,P,P,P,P,P,G,G,TR,TR],
[TR,TR,G,P,X,X,X,D,X,X,G,P,G,G,G,G,G,G,P,G,G,P,G,G,G,G,G,W,W,W,W,G,G,G,G,P,G,G,G,G,G,P,G,G,G,G,G,P,G,X,X,D,X,X,P,G,G,G,TR,TR],
[TR,TR,G,P,X,F,F,F,F,X,G,P,G,G,G,G,G,G,P,G,G,P,G,G,RK,G,G,G,G,G,G,G,G,RK,G,P,G,G,G,G,G,P,G,G,G,G,G,P,G,X,F,F,F,X,P,G,G,G,TR,TR],
[TR,TR,G,P,X,F,F,F,F,X,G,P,G,G,FL,G,G,G,P,G,G,P,G,G,G,G,FL,G,G,G,FL,G,G,G,G,P,G,G,G,G,G,P,G,G,G,FL,G,P,G,X,F,F,F,X,P,G,G,G,TR,TR],
[TR,TR,G,P,X,X,X,X,X,X,G,P,G,G,G,G,G,G,P,G,G,P,G,G,G,G,G,G,G,G,G,G,G,G,G,P,G,G,G,G,G,P,G,G,G,G,G,P,G,X,X,X,X,X,P,G,G,G,TR,TR],
[TR,TR,G,P,P,P,P,P,P,P,P,P,G,G,G,G,G,G,P,G,G,P,P,P,P,P,P,P,P,P,P,P,P,P,P,P,G,G,G,G,G,P,G,G,G,G,G,P,P,P,P,P,P,P,P,G,G,G,TR,TR],
[TR,TR,G,P,X,X,D,X,X,X,G,P,G,G,G,G,G,G,P,G,G,G,G,G,G,G,FL,G,G,G,FL,G,G,G,G,G,G,G,G,G,G,P,G,G,G,G,G,P,G,X,X,D,X,X,X,P,G,G,TR,TR],
[TR,TR,G,P,X,F,F,F,F,X,G,P,G,G,G,FL,G,G,P,G,G,G,G,G,G,G,G,G,G,G,G,G,G,G,G,G,G,G,G,G,G,P,G,FL,G,G,G,P,G,X,F,F,F,F,X,P,G,G,TR,TR],
[TR,TR,G,P,X,X,X,X,X,X,G,P,G,G,G,G,G,G,P,G,G,G,G,G,G,G,G,P,P,P,P,G,G,G,G,G,G,G,G,G,G,P,G,G,G,G,G,P,G,X,X,X,X,X,X,P,G,G,TR,TR],
[TR,TR,G,G,P,P,P,P,P,G,G,P,G,G,G,G,G,G,P,G,G,G,TR,TR,G,G,G,P,P,P,P,G,G,G,TR,TR,G,G,G,G,G,P,G,G,G,G,G,P,G,P,P,P,P,P,G,G,G,G,TR,TR],
[TR,TR,G,G,G,G,G,G,G,G,G,G,G,G,TR,TR,G,G,P,G,G,TR,TR,TR,G,G,G,P,P,P,P,G,G,G,TR,TR,TR,G,G,G,G,P,G,G,TR,TR,G,G,G,G,G,G,G,G,G,G,G,G,TR,TR],
[TR,TR,TR,TR,TR,TR,TR,TR,TR,TR,TR,TR,TR,TR,TR,TR,G,G,P,G,G,TR,G,G,G,G,G,P,G,G,P,G,G,G,G,G,TR,G,G,G,G,P,G,TR,TR,TR,TR,TR,TR,TR,TR,TR,TR,TR,TR,TR,TR,TR,TR,TR],
[TR,TR,TR,TR,TR,TR,TR,TR,TR,TR,TR,TR,TR,TR,TR,TR,G,G,P,G,G,G,G,S,S,P,P,P,G,G,P,P,P,S,S,G,G,G,G,G,G,P,G,TR,TR,TR,TR,TR,TR,TR,TR,TR,TR,TR,TR,TR,TR,TR,TR,TR],
[TR,TR,TR,TR,TR,TR,TR,TR,TR,TR,TR,TR,TR,TR,TR,TR,G,G,P,P,P,P,P,P,P,P,P,P,G,G,P,P,P,P,P,P,P,P,P,P,P,P,G,TR,TR,TR,TR,TR,TR,TR,TR,TR,TR,TR,TR,TR,TR,TR,TR,TR],
[TR,TR,TR,TR,TR,TR,TR,TR,TR,TR,TR,TR,TR,TR,TR,TR,G,G,G,G,G,RK,G,G,G,G,P,G,G,G,G,P,G,G,G,G,RK,G,G,G,G,G,G,TR,TR,TR,TR,TR,TR,TR,TR,TR,TR,TR,TR,TR,TR,TR,TR,TR],
[TR,TR,TR,TR,TR,TR,TR,TR,TR,TR,TR,TR,TR,TR,TR,TR,G,G,G,G,G,G,X,X,X,X,X,X,X,X,X,X,X,X,X,X,G,G,G,G,G,G,G,TR,TR,TR,TR,TR,TR,TR,TR,TR,TR,TR,TR,TR,TR,TR,TR,TR],
[TR,TR,TR,TR,TR,TR,TR,TR,TR,TR,TR,TR,TR,TR,TR,TR,G,G,G,FL,G,G,X,F,F,F,F,F,D,D,F,F,F,F,F,X,G,G,FL,G,G,G,G,TR,TR,TR,TR,TR,TR,TR,TR,TR,TR,TR,TR,TR,TR,TR,TR,TR],
[TR,TR,TR,TR,TR,TR,TR,TR,TR,TR,TR,TR,TR,TR,TR,TR,G,G,G,G,G,G,X,F,F,F,F,F,F,F,F,F,F,F,F,X,G,G,G,G,G,G,G,TR,TR,TR,TR,TR,TR,TR,TR,TR,TR,TR,TR,TR,TR,TR,TR,TR],
[TR,TR,TR,TR,TR,TR,TR,TR,TR,TR,TR,TR,TR,TR,TR,TR,G,G,G,G,G,G,X,F,F,F,F,F,F,F,F,F,F,F,F,X,G,G,G,G,G,G,G,TR,TR,TR,TR,TR,TR,TR,TR,TR,TR,TR,TR,TR,TR,TR,TR,TR],
[TR,TR,TR,TR,TR,TR,TR,TR,TR,TR,TR,TR,TR,TR,TR,TR,G,G,G,G,G,G,X,F,F,F,F,F,F,F,F,F,F,F,F,X,G,G,G,G,G,G,G,TR,TR,TR,TR,TR,TR,TR,TR,TR,TR,TR,TR,TR,TR,TR,TR,TR],
[TR,TR,TR,TR,TR,TR,TR,TR,TR,TR,TR,TR,TR,TR,TR,TR,G,G,G,G,G,G,X,X,X,X,X,X,X,X,X,X,X,X,X,X,G,G,G,G,G,G,G,TR,TR,TR,TR,TR,TR,TR,TR,TR,TR,TR,TR,TR,TR,TR,TR,TR],
[TR,TR,TR,TR,TR,TR,TR,TR,TR,TR,TR,TR,TR,TR,TR,TR,G,G,G,G,G,G,G,G,G,G,G,G,G,G,G,G,G,G,G,G,G,G,G,G,G,G,G,TR,TR,TR,TR,TR,TR,TR,TR,TR,TR,TR,TR,TR,TR,TR,TR,TR],
[TR,TR,TR,TR,TR,TR,TR,TR,TR,TR,TR,TR,TR,TR,TR,TR,TR,TR,TR,TR,TR,TR,TR,TR,TR,TR,TR,TR,TR,TR,TR,TR,TR,TR,TR,TR,TR,TR,TR,TR,TR,TR,TR,TR,TR,TR,TR,TR,TR,TR,TR,TR,TR,TR,TR,TR,TR,TR,TR,TR],
];
function isSolid(t:TT):boolean{return t===WALL||t===WATER||t===TREE||t===ROCK;}

/* SECTION 3: RENDERING HELPERS */
function gPC(c:number,r:number):string{const z=gZ(c,r);return z==="lab"||z==="torre"?"#94a3b8":"#d4a574";}
function gWC(c:number,r:number):string{const z=gZ(c,r);switch(z){case"restaurantes":return"#ea580c";case"clinicas":return"#0891b2";case"lab":return"#7c3aed";case"torre":return"#ca8a04";default:return"#6b7280";}}
function gFC(c:number,r:number):string{const z=gZ(c,r);switch(z){case"restaurantes":return"#fed7aa";case"clinicas":return"#cffafe";case"lab":return"#ede9fe";case"torre":return"#fef9c3";default:return"#e5e7eb";}}
const FLC=["#ec4899","#eab308","#ffffff","#f472b6","#facc15"];

/* SECTION 4: PLAYER */
interface PState{x:number;y:number;facing:number;isMoving:boolean;wf:number;wt:number;it:number;ib:number;}
function fP():PState{return{x:30*TP+8,y:22*TP+8,facing:DD,isMoving:false,wf:0,wt:0,it:0,ib:0};}

/* SECTION 5: NPC DATA — All 15 NPCs */
interface NPC{id:string;name:string;bc:string;hc:string;x:number;y:number;zone:ZI;pages:string[][];qt:string;}
const NPCS:NPC[]=[
{id:"tomas",name:"Guia Tomas",bc:"#22c55e",hc:"#44403c",x:28*TP+8,y:20*TP+8,zone:"centro",qt:"",pages:[
["Bem-vindo ao mundo da Descomplicai! Sou o Tomas, o teu guia.","Este mundo tem 5 zonas para explorar. Cada uma conta uma historia diferente."],
["A leste ficam os Restaurantes \u2014 gastronomia digital.","A oeste, Distrito das Clinicas \u2014 saude ao alcance de um clique."],
["A norte o Laboratorio Tech \u2014 ferramentas e jogos.","A sul a Torre do Portfolio. So entras quando estiveres pronto."],
["Fala com todos, abre cofres, completa missoes. Boa sorte!","Dica: Q=Missoes, I=Inventario, M=Mapa, ESC=Pausa."]]},
{id:"marco",name:"Chef Marco",bc:"#ef4444",hc:"#1c1917",x:50*TP+8,y:15*TP+8,zone:"restaurantes",qt:"chefs",pages:[
["Ola! Sou o Chef Marco, mestre da cozinha tradicional.","Aqui cada edificio conta a historia de um restaurante real."],
["A Cacarola? Cozinha portuguesa autentica em Coimbra.","Site lindo \u2014 menu digital, galeria e reservas online."],
["O Bijou? Brunch elegante. O Picadeiro? Alma alentejana.","Cada projeto e unico!"],
["Nao fazemos templates \u2014 fazemos experiencias digitais a medida.","Isso e descomplicar!"]]},
{id:"ana",name:"Chef Ana",bc:"#f97316",hc:"#78350f",x:52*TP+8,y:21*TP+8,zone:"restaurantes",qt:"chefs",pages:[
["Ola! Sou a Chef Ana, especialista em cozinha costeira!","Adoro o sabor do mar e os restaurantes de praia."],
["Pe na Areia \u2014 pes literalmente na areia!","Cores do oceano, tipografia leve, fotos deslumbrantes."],
["Nalu em Cabedelo? Surf, acai e boa energia.","Sand Murtinheira e Tasca da Praia completam a colecao."],
["Cada restaurante de praia tem a sua vibracao.","Tudo pensado para dar vontade de la ir!"]]},
{id:"miguel",name:"Chef Miguel",bc:"#92400e",hc:"#0c0a09",x:49*TP+8,y:27*TP+8,zone:"restaurantes",qt:"chefs",pages:[
["Boas! Sou o Miguel, sommelier.","O MeioCheio e uma experiencia sensorial."],
["Tons escuros, tipografia premium, carta de vinhos interativa.","Um wine bar precisa de um site com classe."],
["A Descomplicai ja criou mais de 20 sites para restaurantes.","Cada um e diferente porque cada restaurante conta a sua historia."]]},
{id:"sofia",name:"Dra. Sofia",bc:"#14b8a6",hc:"#713f12",x:8*TP+8,y:15*TP+8,zone:"clinicas",qt:"clinicas",pages:[
["Ola! Sou a Dra. Sofia, dentista infantil.","DentalKid \u2014 clinica dentaria so para criancas!"],
["Site super divertido. Cores vivas, animacoes suaves...","As criancas adoram! Pais mais tranquilos."],
["Alegre mas profissional \u2014 equilibrio perfeito.","Descomplicou o complicado!"],
["Saude acessivel comeca pela comunicacao.","Um bom site e o primeiro passo."]]},
{id:"ricardo",name:"Dr. Ricardo",bc:"#3b82f6",hc:"#292524",x:6*TP+8,y:21*TP+8,zone:"clinicas",qt:"clinicas",pages:[
["Bom dia! Sou o Dr. Ricardo, diretor clinico.","Clinica Vasco da Gama \u2014 referencia na zona centro."],
["Confianca e modernidade no nosso site.","Premium Clinica? Design elegante, navegacao intuitiva."],
["Na saude, o digital ja nao e opcional.","Site profissional faz a diferenca."]]},
{id:"marta",name:"Enfermeira Marta",bc:"#f8fafc",hc:"#57534e",x:10*TP+8,y:27*TP+8,zone:"clinicas",qt:"clinicas",pages:[
["Ola! Sou a Marta, enfermeira na FozClinica.","Multiespecialidade na Figueira da Foz."],
["Site completo: marcacoes, equipa, especialidades...","Tambem fizeram o site da UpConcept."],
["Pacientes marcam consultas facilmente.","Descomplicar a saude \u2014 e isso que o Jaime faz!"]]},
{id:"luna",name:"Hacker Luna",bc:"#a855f7",hc:"#1e1b4b",x:20*TP+8,y:4*TP+8,zone:"lab",qt:"lab",pages:[
["Yo! Sou a Luna, hacker etica!","Bem-vindo ao Laboratorio Tech!"],
["JSON Formatter? Cola baralhado, sai bonito!","Zero backend, zero tracking. Privacidade total!"],
["Regex Tester \u2014 BRUTAL. Matches em tempo real.","CSS Playground? CSS ao vivo!"],
["100% client-side. Nada sai do browser.","Nenhum dado. Zero. Zilch. Nada!"],
["Obcecado com privacidade e performance.","Sem anuncios, sem cookies, sem tracking."]]},
{id:"pedro",name:"Artista Pedro",bc:"#ec4899",hc:"#4a044e",x:30*TP+8,y:3*TP+8,zone:"lab",qt:"lab",pages:[
["Ola! Sou o Pedro, artista digital!","Arte e codigo coexistem aqui no Lab."],
["Generative Art \u2014 arte unica a cada refresh!","Pixel Art Editor para os nostalgicos."],
["Drawing Canvas \u2014 quadro digital completo!","Music Box? Caixinhas de musica virtuais."],
["Tecnologia pode ser bela e acessivel.","So precisas das ferramentas certas!"]]},
{id:"rita",name:"Cientista Rita",bc:"#06b6d4",hc:"#365314",x:40*TP+8,y:4*TP+8,zone:"lab",qt:"lab",pages:[
["Ola! Sou a Rita, cientista e educadora.","A educacao e a base de tudo."],
["Tabela Periodica interativa \u2014 fantastica!","Sistema Solar? Orbitas reais animadas."],
["Sorting Visualizer \u2014 algoritmos visuais.","Mapa de Portugal? Distritos interativos!"],
["Intuitiva e visualmente rica.","Aprender deve ser tao simples quanto brincar!"]]},
{id:"daniel",name:"Musico Daniel",bc:"#6366f1",hc:"#0f172a",x:22*TP+8,y:8*TP+8,zone:"lab",qt:"lab",pages:[
["E ai! Sou o Daniel, musico programador!","Web Audio API \u2014 instrumentos no browser!"],
["Synth completo \u2014 osciladores, filtros, envelopes...","Drum Machine com sequenciador de 16 passos!"],
["Guitar Tuner usa o microfone para afinar!","Music Theory \u2014 escalas, acordes, progressoes."],
["Tudo com JavaScript e Web Audio API.","O browser e o instrumento mais versatil!"]]},
{id:"sara",name:"Gamer Sara",bc:"#f472b6",hc:"#831843",x:35*TP+8,y:8*TP+8,zone:"lab",qt:"lab",pages:[
["Level up! Sou a Sara, game designer!","Jogos no browser? O Jaime fez VARIOS!"],
["Chess com IA! Snake moderno! Memory animado!","Quiz Portugal testa o teu conhecimento!"],
["Maze Solver \u2014 labirintos e algoritmos!","Gamificacao e o futuro do engagement."]]},
{id:"carlos",name:"Professor Carlos",bc:"#eab308",hc:"#422006",x:28*TP+8,y:35*TP+8,zone:"torre",qt:"",pages:[
["Sou o Professor Carlos, guardiao da Torre.","A historia completa da Descomplicai esta la dentro."],
["Completa pelo menos 5 missoes primeiro.","Explora, fala com as pessoas, abre cofres."],
["Quando estiveres pronto, a porta abre-se.","Persistencia e a chave do sucesso!"]]},
{id:"jaime",name:"Jaime Silva",bc:"#1e40af",hc:"#0c0a09",x:29*TP+8,y:40*TP+8,zone:"torre",qt:"jaime",pages:[
["Conseguiste chegar aqui. Bem-vindo a Torre.","Sou o Jaime Silva, fundador da Descomplicai."],
["Tecnologia deve ser para todos.","Nao so programadores \u2014 para TODOS."],
["109 paginas numa noite. 52.000+ linhas de codigo!","Cada linha com proposito. Cada pixel com intencao."],
["Humanos Primeiro. IA e ferramenta, nao substituto.","Criatividade e empatia vem de nos \u2014 humanos."],
["Building in public \u2014 transparente e partilhado.","Partilhar conhecimento eleva toda a comunidade."],
["Obrigado por jogares. Obrigado por explorares.","Vai desimplifica o mundo! ;)"]]},
{id:"mylo",name:"Mylo",bc:"#9ca3af",hc:"#4b5563",x:38*TP+8,y:17*TP+8,zone:"centro",qt:"",pages:[
["Bip bop! Encontraste-me! Sou o Mylo, IA da Descomplicai.","Poucas pessoas encontram este cantinho!"],
["Sim, sou uma IA. Ajudo com codigo e design.","Mas quem faz a magia e o Jaime!"],
["Gerado com Claude da Anthropic.","5000+ linhas de TypeScript, React, Canvas 2D."],
["Next.js, TypeScript, Tailwind, Framer Motion, Canvas API.","Nenhum game engine. So codigo limpo!"]]},
];

/* SECTION 6: DIALOGUE */
interface DS{open:boolean;nId:string;nN:string;nC:string;pgs:string[][];pg:number;l1:string;s1:string;i1:number;t1:boolean;l2:string;s2:string;i2:number;t2:boolean;}
const ED:DS={open:false,nId:"",nN:"",nC:"#fff",pgs:[],pg:0,l1:"",s1:"",i1:0,t1:false,l2:"",s2:"",i2:0,t2:false};

/* SECTION 7: QUESTS */
interface QS{id:string;name:string;desc:string;tgt:number;prg:number;done:boolean;rwd:string;emo:string;}
function fQ():QS[]{return[
{id:"pp",name:"Primeiro Passo",desc:"Visita 2 zonas",tgt:2,prg:0,done:false,rwd:"Explorador",emo:"\u{1F9ED}"},
{id:"cv",name:"Conversador",desc:"Fala com 5 NPCs",tgt:5,prg:0,done:false,rwd:"Comunicador",emo:"\u{1F4AC}"},
{id:"et",name:"Explorador Total",desc:"Visita as 5 zonas",tgt:5,prg:0,done:false,rwd:"Mestre Explorador",emo:"\u{1F5FA}"},
{id:"ct",name:"Caca ao Tesouro",desc:"Abre 5 cofres",tgt:5,prg:0,done:false,rwd:"Cacador",emo:"\u{1F3F4}\u200D\u2620\uFE0F"},
{id:"ch",name:"Amigo dos Chefs",desc:"Fala com 3 Chefs",tgt:3,prg:0,done:false,rwd:"Gourmet",emo:"\u{1F468}\u200D\u{1F373}"},
{id:"cl",name:"Doutor Digital",desc:"Fala com 3 medicos",tgt:3,prg:0,done:false,rwd:"Saude Digital",emo:"\u{1F3E5}"},
{id:"lb",name:"Hacker Supremo",desc:"Fala com 5 do Lab",tgt:5,prg:0,done:false,rwd:"Hacker",emo:"\u{1F4BB}"},
{id:"lg",name:"Lenda da Descomplicai",desc:"Completa tudo + Jaime",tgt:1,prg:0,done:false,rwd:"LENDA",emo:"\u{1F451}"},
];}

/* SECTION 8: CHESTS */
interface CH{id:number;col:number;row:number;opn:boolean;af:number;bdg:string;be:string;z:ZI;}
function fC():CH[]{return[
{id:0,col:25,row:18,opn:false,af:0,bdg:"React",be:"\u269B\uFE0F",z:"centro"},
{id:1,col:33,row:24,opn:false,af:0,bdg:"TypeScript",be:"\u{1F4D8}",z:"centro"},
{id:2,col:50,row:18,opn:false,af:0,bdg:"Next.js",be:"\u25B2",z:"restaurantes"},
{id:3,col:53,row:25,opn:false,af:0,bdg:"Python",be:"\u{1F40D}",z:"restaurantes"},
{id:4,col:7,row:18,opn:false,af:0,bdg:"Tailwind",be:"\u{1F3A8}",z:"clinicas"},
{id:5,col:12,row:25,opn:false,af:0,bdg:"Framer Motion",be:"\u{1F3AC}",z:"clinicas"},
{id:6,col:24,row:6,opn:false,af:0,bdg:"Canvas API",be:"\u{1F5BC}\uFE0F",z:"lab"},
{id:7,col:38,row:6,opn:false,af:0,bdg:"Web Audio",be:"\u{1F3B5}",z:"lab"},
{id:8,col:25,row:36,opn:false,af:0,bdg:"Three.js",be:"\u{1F310}",z:"torre"},
{id:9,col:33,row:36,opn:false,af:0,bdg:"Claude AI",be:"\u{1F916}",z:"torre"},
];}

/* SECTION 9: PARTICLES */
interface PT{x:number;y:number;vx:number;vy:number;life:number;ml:number;color:string;sz:number;gv:boolean;ch?:string;}
function mP(x:number,y:number,vx:number,vy:number,l:number,c:string,s:number,g:boolean,ch?:string):PT{return{x,y,vx,vy,life:l,ml:l,color:c,sz:s,gv:g,ch};}

/* SECTION 10: SAVE/LOAD */
interface SD{px:number;py:number;fc:number;zn:string[];np:string[];ch:number[];qs:{id:string;p:number;d:boolean}[];tm:number;tl:string[];}
function gS(p:PState,z:Set<string>,n:Set<string>,b:Set<number>,q:QS[],t:number,tl:Set<string>){try{localStorage.setItem(SK,JSON.stringify({px:p.x,py:p.y,fc:p.facing,zn:[...z],np:[...n],ch:[...b],qs:q.map(qq=>({id:qq.id,p:qq.prg,d:qq.done})),tm:t,tl:[...tl]} as SD))}catch{}}
function gL():SD|null{try{const r=localStorage.getItem(SK);return r?JSON.parse(r):null}catch{return null}}
function gD(){try{localStorage.removeItem(SK)}catch{}}

/* SECTION 11: TILE DRAW */
function dT(c:CanvasRenderingContext2D,t:TT,sx:number,sy:number,sz:number,cl:number,rw:number,v:boolean,wf:number,ff:number){
if(!v){c.fillStyle="#0a0f0a";c.fillRect(sx,sy,sz,sz);return;}
switch(t){
case GRASS:c.fillStyle="#4ade80";c.fillRect(sx,sy,sz,sz);c.strokeStyle="#3bcc6e";c.lineWidth=0.5;c.beginPath();c.moveTo(sx+4,sy+sz-4);c.lineTo(sx+4,sy+sz-10);c.moveTo(sx+sz-6,sy+sz-3);c.lineTo(sx+sz-6,sy+sz-9);c.stroke();break;
case WATER:c.fillStyle=wf===0?"#3b82f6":"#60a5fa";c.fillRect(sx,sy,sz,sz);c.fillStyle="rgba(255,255,255,0.35)";c.fillRect(sx+8+(wf*6),sy+6,2,2);c.fillRect(sx+20-(wf*4),sy+18,2,2);break;
case PATH:c.fillStyle=gPC(cl,rw);c.fillRect(sx,sy,sz,sz);c.strokeStyle="rgba(0,0,0,0.12)";c.lineWidth=0.5;c.strokeRect(sx,sy,sz,sz);break;
case WALL:{const wc=gWC(cl,rw);c.fillStyle=wc;c.fillRect(sx,sy,sz,sz);c.fillStyle="rgba(0,0,0,0.25)";c.fillRect(sx,sy+sz-4,sz,4);break;}
case SAND:c.fillStyle="#fbbf24";c.fillRect(sx,sy,sz,sz);break;
case FLOOR:c.fillStyle=gFC(cl,rw);c.fillRect(sx,sy,sz,sz);c.strokeStyle="rgba(0,0,0,0.06)";c.lineWidth=0.5;c.strokeRect(sx+1,sy+1,sz-2,sz-2);break;
case DOOR:{const dc=gWC(cl,rw);c.fillStyle=dc;c.fillRect(sx,sy,sz,sz);c.fillStyle="rgba(0,0,0,0.4)";c.fillRect(sx+6,sy+4,sz-12,sz-4);c.fillStyle="#fbbf24";c.beginPath();c.arc(sx+sz-10,sy+sz/2,2,0,Math.PI*2);c.fill();break;}
case BRIDGE:c.fillStyle=wf===0?"#3b82f6":"#60a5fa";c.fillRect(sx,sy,sz,sz);c.fillStyle="#92400e";c.fillRect(sx+2,sy+2,sz-4,6);c.fillRect(sx+2,sy+12,sz-4,6);c.fillRect(sx+2,sy+22,sz-4,6);break;
case TREE:c.fillStyle="#4ade80";c.fillRect(sx,sy,sz,sz);c.fillStyle="#92400e";c.fillRect(sx+sz/2-3,sy+sz/2,6,sz/2);c.fillStyle="#166534";c.beginPath();c.arc(sx+sz/2,sy+sz/2-2,sz/2-4,0,Math.PI*2);c.fill();c.fillStyle="#22c55e";c.beginPath();c.arc(sx+sz/2-3,sy+sz/2-6,4,0,Math.PI*2);c.fill();break;
case FLOWER:c.fillStyle="#4ade80";c.fillRect(sx,sy,sz,sz);c.fillStyle=FLC[(ff+cl+rw)%FLC.length];c.beginPath();c.arc(sx+8,sy+10,3,0,Math.PI*2);c.fill();c.fillStyle=FLC[(ff+cl*2+rw)%FLC.length];c.beginPath();c.arc(sx+22,sy+20,2.5,0,Math.PI*2);c.fill();break;
case ROCK:c.fillStyle="#4ade80";c.fillRect(sx,sy,sz,sz);c.fillStyle="#6b7280";c.beginPath();c.ellipse(sx+sz/2,sy+sz/2+2,sz/2-4,sz/3-2,0,0,Math.PI*2);c.fill();c.fillStyle="#9ca3af";c.beginPath();c.ellipse(sx+sz/2-2,sy+sz/2-1,sz/4,sz/6,0,0,Math.PI*2);c.fill();break;
}}

/* SECTION 12: CHARACTER DRAW */
function dCh(c:CanvasRenderingContext2D,px:number,py:number,bc:string,hc:string,fc:number,bn:number,mv:boolean,wf:number,ey:boolean){
c.fillStyle=bc;c.fillRect(px-7,py-4+bn,14,14);
c.fillStyle="#fcd6b0";c.beginPath();c.arc(px,py-10+bn,8,0,Math.PI*2);c.fill();
c.fillStyle=hc;c.beginPath();c.arc(px,py-14+bn,8,Math.PI,Math.PI*2);c.fill();c.fillRect(px-8,py-14+bn,16,4);
if(ey){c.fillStyle="#1a1a1a";if(fc===DD){c.fillRect(px-4,py-11+bn,2.5,2.5);c.fillRect(px+2,py-11+bn,2.5,2.5);}else if(fc===DL){c.fillRect(px-5,py-11+bn,2.5,2.5);c.fillRect(px-1,py-11+bn,2.5,2.5);}else if(fc===DR){c.fillRect(px+1,py-11+bn,2.5,2.5);c.fillRect(px+5,py-11+bn,2.5,2.5);}}
c.fillStyle="#374151";const lo=mv?Math.sin(wf*Math.PI/2)*3:0;c.fillRect(px-5,py+10+bn+lo,4,6);c.fillRect(px+1,py+10+bn-lo,4,6);}

/* SECTION 13: CHEST + MINIMAP DRAW */
function dCS(c:CanvasRenderingContext2D,cx:number,cy:number,o:boolean,af:number){if(o){c.fillStyle="#92400e";c.fillRect(cx+4,cy+10,RT-8,RT-14);c.fillStyle="#78350f";c.fillRect(cx+4,cy+6,RT-8,6);c.fillStyle="#fbbf24";c.fillRect(cx+8,cy+14,RT-16,6);}else if(af>0){const a=Math.min(af,1);c.fillStyle="#92400e";c.fillRect(cx+4,cy+10,RT-8,RT-14);c.fillStyle="#78350f";c.fillRect(cx+4,cy+10-a*8,RT-8,6);c.fillStyle="#fbbf24";c.fillRect(cx+8,cy+14,RT-16,6*a);}else{c.fillStyle="#92400e";c.fillRect(cx+4,cy+8,RT-8,RT-12);c.fillStyle="#78350f";c.fillRect(cx+4,cy+6,RT-8,8);c.fillStyle="#fbbf24";c.fillRect(cx+RT/2-3,cy+12,6,6);}}

function dMM(c:CanvasRenderingContext2D,cw:number,mW:number,mH:number,vs:Set<string>,chs:CH[],bd:Set<number>,pc:number,pr:number,ts:number){const mx=cw-mW-10,my=10,tw=mW/MC,th=mH/MR;c.fillStyle="rgba(0,0,0,0.7)";c.fillRect(mx-2,my-2,mW+4,mH+4);c.strokeStyle="#fbbf24";c.lineWidth=1;c.strokeRect(mx-2,my-2,mW+4,mH+4);for(let r=0;r<MR;r++)for(let cc=0;cc<MC;cc++){const t=GM[r]?.[cc];if(t===undefined)continue;const v=vs.has(cc+","+r);let cl="#0a0a0a";if(v){switch(t){case GRASS:case FLOWER:cl="#4ade80";break;case WATER:cl="#3b82f6";break;case PATH:cl="#d4a574";break;case WALL:cl=gWC(cc,r);break;case FLOOR:cl=gFC(cc,r);break;case DOOR:cl=gWC(cc,r);break;case BRIDGE:cl="#92400e";break;case TREE:cl="#166534";break;case ROCK:cl="#6b7280";break;case SAND:cl="#fbbf24";break;}}c.fillStyle=cl;c.fillRect(mx+cc*tw,my+r*th,Math.ceil(tw),Math.ceil(th));}for(const ch of chs){if(bd.has(ch.id)||!vs.has(ch.col+","+ch.row))continue;c.fillStyle="#fbbf24";c.fillRect(mx+ch.col*tw,my+ch.row*th,3,3);}for(const n of NPCS){const nc=Math.floor(n.x/TP),nr=Math.floor(n.y/TP);if(!vs.has(nc+","+nr))continue;c.fillStyle=n.bc;c.beginPath();c.arc(mx+nc*tw+tw/2,my+nr*th+th/2,2,0,Math.PI*2);c.fill();}if(Math.floor(ts/300)%2===0){c.fillStyle="#fff";c.beginPath();c.arc(mx+pc*tw+tw/2,my+pr*th+th/2,3,0,Math.PI*2);c.fill();}}

/* SECTION 14-15: MAIN COMPONENT */
export default function DescomplicaiRPG(){
const cvR=useRef<HTMLCanvasElement>(null);const rfR=useRef(0);const ltR=useRef(0);
const[ph,setPh]=useState<"menu"|"play"|"win">("menu");const[hs,setHs]=useState(false);
const pR=useRef(fP());const cR=useRef({x:0,y:0});const tR=useRef(new Set<string>());const zR=useRef(new Set<string>());const tlR=useRef(new Set<string>());const qR=useRef(fQ());const chR=useRef(fC());const bR=useRef(new Set<number>());const ptR=useRef<PT[]>([]);const tmR=useRef(0);const taR=useRef(0);const wfR=useRef(0);const wtR=useRef(0);const ffR=useRef(0);const ftR=useRef(0);const dgR=useRef<DS>({...ED});const lzR=useRef("");const asR=useRef(0);const icR=useRef(0);
const kR=useRef({u:false,d:false,l:false,r:false,e:false,s:false});const tcR=useRef({u:false,d:false,l:false,r:false,a:false});
const[dl,sDl]=useState<DS>({...ED});const[sQ,sSQ]=useState(false);const[sI,sSI]=useState(false);const[sP,sSP]=useState(false);const[mm,sMM]=useState<"s"|"l">("s");const[sF,sSF]=useState(false);const[zb,sZB]=useState("");const[zbV,sZBV]=useState(false);const[qn,sQN]=useState("");const[cn,sCN]=useState("");const[pm,sPM]=useState("");const[fv,sFV]=useState(60);const[qS,sQS]=useState(fQ());const[cS,sCS]=useState(fC());const[bS,sBS]=useState(new Set<number>());const[tc,sTC]=useState(0);const[zc,sZC]=useState(0);const[td,sTD]=useState(0);const[sz,sSZ]=useState({w:960,h:720});const zbT=useRef<ReturnType<typeof setTimeout>|null>(null);const stR=useRef<{x:number;y:number;s:number;a:number}[]>([]);

useEffect(()=>{setHs(gL()!==null);const s:typeof stR.current=[];for(let i=0;i<60;i++)s.push({x:Math.random()*1200,y:Math.random()*800,s:Math.random()*2+0.5,a:Math.random()});stR.current=s;},[]);
useEffect(()=>{const h=()=>sSZ({w:window.innerWidth,h:window.innerHeight});h();window.addEventListener("resize",h);return()=>window.removeEventListener("resize",h);},[]);
useEffect(()=>{if(ph!=="play")return;const kd=(e:KeyboardEvent)=>{const k=e.key.toLowerCase();const i=kR.current;if(k==="w"||k==="arrowup")i.u=true;if(k==="s"||k==="arrowdown")i.d=true;if(k==="a"||k==="arrowleft")i.l=true;if(k==="d"||k==="arrowright")i.r=true;if(k==="e"||k===" "||k==="enter")i.e=true;if(k==="shift")i.s=true;if(k==="q"){e.preventDefault();sSQ(p=>!p);}if(k==="i"){e.preventDefault();sSI(p=>!p);}if(k==="m"){e.preventDefault();sMM(p=>p==="s"?"l":"s");}if(k==="escape"){e.preventDefault();sSP(p=>!p);sSQ(false);sSI(false);}if(k==="f"){e.preventDefault();sSF(p=>!p);}};const ku=(e:KeyboardEvent)=>{const k=e.key.toLowerCase();const i=kR.current;if(k==="w"||k==="arrowup")i.u=false;if(k==="s"||k==="arrowdown")i.d=false;if(k==="a"||k==="arrowleft")i.l=false;if(k==="d"||k==="arrowright")i.r=false;if(k==="e"||k===" "||k==="enter")i.e=false;if(k==="shift")i.s=false;};window.addEventListener("keydown",kd);window.addEventListener("keyup",ku);return()=>{window.removeEventListener("keydown",kd);window.removeEventListener("keyup",ku);};},[ph]);

const eP=useCallback((x:number,y:number,n:number,c:string,sp:number,g:boolean,ch?:string)=>{const a=ptR.current;for(let i=0;i<n&&a.length<MP;i++)a.push(mP(x+(Math.random()-.5)*4,y+(Math.random()-.5)*4,(Math.random()-.5)*sp,(Math.random()-.5)*sp-(g?1:0),30+Math.random()*30,c,2+Math.random()*2,g,ch));},[]);

const cQ=useCallback(()=>{const qs=qR.current;const vs=zR.current;const tk=tR.current;const bd=bR.current;let ch=false;
if(!qs[0].done){const p=vs.size;if(p!==qs[0].prg){qs[0].prg=Math.min(p,qs[0].tgt);ch=true;}if(qs[0].prg>=qs[0].tgt){qs[0].done=true;sQN("Missao Completa: "+qs[0].name+"!");setTimeout(()=>sQN(""),3000);ch=true;}}
if(!qs[1].done){const p=tk.size;if(p!==qs[1].prg){qs[1].prg=Math.min(p,qs[1].tgt);ch=true;}if(qs[1].prg>=qs[1].tgt){qs[1].done=true;sQN("Missao Completa: "+qs[1].name+"!");setTimeout(()=>sQN(""),3000);ch=true;}}
if(!qs[2].done){const p=vs.size;if(p!==qs[2].prg){qs[2].prg=Math.min(p,qs[2].tgt);ch=true;}if(qs[2].prg>=qs[2].tgt){qs[2].done=true;sQN("Missao Completa: "+qs[2].name+"!");setTimeout(()=>sQN(""),3000);ch=true;}}
if(!qs[3].done){const p=bd.size;if(p!==qs[3].prg){qs[3].prg=Math.min(p,qs[3].tgt);ch=true;}if(qs[3].prg>=qs[3].tgt){qs[3].done=true;sQN("Missao Completa: "+qs[3].name+"!");setTimeout(()=>sQN(""),3000);ch=true;}}
if(!qs[4].done){let c=0;if(tk.has("marco"))c++;if(tk.has("ana"))c++;if(tk.has("miguel"))c++;if(c!==qs[4].prg){qs[4].prg=c;ch=true;}if(qs[4].prg>=qs[4].tgt){qs[4].done=true;sQN("Missao Completa: "+qs[4].name+"!");setTimeout(()=>sQN(""),3000);ch=true;}}
if(!qs[5].done){let c=0;if(tk.has("sofia"))c++;if(tk.has("ricardo"))c++;if(tk.has("marta"))c++;if(c!==qs[5].prg){qs[5].prg=c;ch=true;}if(qs[5].prg>=qs[5].tgt){qs[5].done=true;sQN("Missao Completa: "+qs[5].name+"!");setTimeout(()=>sQN(""),3000);ch=true;}}
if(!qs[6].done){let c=0;["luna","pedro","rita","daniel","sara"].forEach(id=>{if(tk.has(id))c++;});if(c!==qs[6].prg){qs[6].prg=c;ch=true;}if(qs[6].prg>=qs[6].tgt){qs[6].done=true;sQN("Missao Completa: "+qs[6].name+"!");setTimeout(()=>sQN(""),3000);ch=true;}}
if(!qs[7].done){if(qs.slice(0,7).every(q=>q.done)&&tk.has("jaime")){qs[7].prg=1;qs[7].done=true;sQN("LENDA DA DESCOMPLICAI!");setTimeout(()=>{sQN("");setPh("win");},3000);ch=true;}}
if(ch)sQS([...qs]);},[]);

const startGame=useCallback((fs:boolean)=>{if(fs){const sv=gL();if(sv){pR.current={...fP(),x:sv.px,y:sv.py,facing:sv.fc};zR.current=new Set(sv.zn);tR.current=new Set(sv.np);bR.current=new Set(sv.ch);tmR.current=sv.tm;tlR.current=new Set(sv.tl||[]);const qs=fQ();for(const sq of sv.qs){const q=qs.find(qq=>qq.id===sq.id);if(q){q.prg=sq.p;q.done=sq.d;}}qR.current=qs;sQS([...qs]);const cs=fC();for(const cid of sv.ch){const c=cs.find(cc=>cc.id===cid);if(c)c.opn=true;}chR.current=cs;sCS([...cs]);sBS(new Set(sv.ch));sTC(sv.np.length);sZC(sv.zn.length);sTD(sv.tm);}}else{pR.current=fP();zR.current=new Set();tR.current=new Set();bR.current=new Set();qR.current=fQ();chR.current=fC();tmR.current=0;tlR.current=new Set();sQS(fQ());sCS(fC());sBS(new Set());sTC(0);sZC(0);sTD(0);}ptR.current=[];dgR.current={...ED};sDl({...ED});sSQ(false);sSI(false);sSP(false);lzR.current="";setPh("play");},[]);

const oDlg=useCallback((n:NPC)=>{const d:DS={open:true,nId:n.id,nN:n.name,nC:n.bc,pgs:n.pages,pg:0,l1:n.pages[0][0],s1:"",i1:0,t1:true,l2:n.pages[0].length>1?n.pages[0][1]:"",s2:"",i2:0,t2:false};dgR.current=d;sDl({...d});if(!tR.current.has(n.id)){tR.current.add(n.id);sTC(tR.current.size);eP(n.x,n.y-12,3,"#fbbf24",1,true,"\u266A");}cQ();},[eP,cQ]);

const aDlg=useCallback(()=>{const d=dgR.current;if(!d.open)return;if(d.t1){d.s1=d.l1;d.i1=d.l1.length;d.t1=false;if(d.l2)d.t2=true;dgR.current={...d};sDl({...d});return;}if(d.t2){d.s2=d.l2;d.i2=d.l2.length;d.t2=false;dgR.current={...d};sDl({...d});return;}const np=d.pg+1;if(np<d.pgs.length){d.pg=np;d.l1=d.pgs[np][0];d.s1="";d.i1=0;d.t1=true;d.l2=d.pgs[np].length>1?d.pgs[np][1]:"";d.s2="";d.i2=0;d.t2=false;dgR.current={...d};sDl({...d});}else{d.open=false;dgR.current={...d};sDl({...d});cQ();}},[cQ]);

const iAct=useCallback(()=>{if(dgR.current.open){aDlg();return;}const p=pR.current;for(const n of NPCS){const dx=n.x-p.x,dy=n.y-p.y;if(Math.sqrt(dx*dx+dy*dy)<ID){if(n.id==="jaime"&&qR.current.filter(q=>q.done).length<5)return;oDlg(n);return;}}for(const c of chR.current){if(c.opn)continue;const cx=c.col*TP+8,cy=c.row*TP+8;const dx=cx-p.x,dy=cy-p.y;if(Math.sqrt(dx*dx+dy*dy)<ID){c.af=0.01;setTimeout(()=>{c.opn=true;c.af=0;bR.current.add(c.id);sBS(new Set(bR.current));sCN(c.be+" "+c.bdg+" obtido!");setTimeout(()=>sCN(""),2500);eP(cx,cy,12,"#fbbf24",3,true);sCS([...chR.current]);cQ();},400);sCS([...chR.current]);return;}}},[aDlg,oDlg,eP,cQ]);

/* GAME LOOP */
useEffect(()=>{if(ph!=="play")return;const cv=cvR.current;if(!cv)return;const cx=cv.getContext("2d");if(!cx)return;let ff=0,ft=0;
function lp(ts:number){const dt=ltR.current?Math.min((ts-ltR.current)/16.667,3):1;ltR.current=ts;ff++;if(ts-ft>=1000){sFV(ff);ff=0;ft=ts;}taR.current+=dt;if(taR.current>=60){tmR.current++;taR.current-=60;sTD(tmR.current);}asR.current+=dt*16.667;if(asR.current>=AS){asR.current=0;gS(pR.current,zR.current,tR.current,bR.current,qR.current,tmR.current,tlR.current);}
const cw=sz.w,ch=sz.h;const k=kR.current,tc=tcR.current;const up=k.u||tc.u,dn=k.d||tc.d,lt=k.l||tc.l,rt=k.r||tc.r,act=k.e||tc.a;
if(icR.current>0)icR.current-=dt;if(act&&icR.current<=0){iAct();icR.current=15;k.e=false;tc.a=false;}
const ov=dgR.current.open||sP||sQ||sI;const pl=pR.current;
if(!ov){let dx=0,dy=0;if(up){dy=-1;pl.facing=DU;}if(dn){dy=1;pl.facing=DD;}if(lt){dx=-1;pl.facing=DL;}if(rt){dx=1;pl.facing=DR;}if(dx&&dy){const m=Math.SQRT1_2;dx*=m;dy*=m;}const spd=PS*(k.s?SM:1)*dt;const nx=pl.x+dx*spd,ny=pl.y+dy*spd;const mg=4;const cw2=(px:number,py:number)=>{const c=Math.floor(px/TP),r=Math.floor(py/TP);if(c<0||c>=MC||r<0||r>=MR)return false;const t=GM[r][c];return t===BRIDGE||!isSolid(t);};
let oX=true,oY=true;if(dx!==0){if(!cw2(nx-mg,pl.y-mg)||!cw2(nx+mg,pl.y-mg)||!cw2(nx-mg,pl.y+mg)||!cw2(nx+mg,pl.y+mg))oX=false;}if(dy!==0){if(!cw2(pl.x-mg,ny-mg)||!cw2(pl.x+mg,ny-mg)||!cw2(pl.x-mg,ny+mg)||!cw2(pl.x+mg,ny+mg))oY=false;}if(oX)pl.x=nx;if(oY)pl.y=ny;pl.x=Math.max(TP,Math.min(pl.x,(MC-1)*TP));pl.y=Math.max(TP,Math.min(pl.y,(MR-1)*TP));
pl.isMoving=dx!==0||dy!==0;if(pl.isMoving){pl.wt+=dt;if(pl.wt>=12){pl.wt=0;pl.wf=(pl.wf+1)%4;}if(Math.random()<0.12){const pc=Math.floor(pl.x/TP),pr=Math.floor(pl.y/TP);if(pc>=0&&pc<MC&&pr>=0&&pr<MR){const tt=GM[pr][pc];if(tt===PATH||tt===SAND)eP(pl.x,pl.y+6,2,"#d4a574",0.5,false);}}pl.it=0;}else{pl.it+=dt;pl.ib=pl.it>120?Math.sin(pl.it*0.05)*1.5:0;}
const pc=Math.floor(pl.x/TP),pr=Math.floor(pl.y/TP);const z=gZ(pc,pr);if(z&&z!==lzR.current){lzR.current=z;if(!zR.current.has(z)){zR.current.add(z);sZC(zR.current.size);const zbb=ZB.find(zz=>zz.id===z);if(zbb)eP(pl.x,pl.y-10,8,zbb.color,2,true,"!");cQ();}sZB(ZN[z]);sZBV(true);if(zbT.current)clearTimeout(zbT.current);zbT.current=setTimeout(()=>sZBV(false),2500);}
for(let dr=-3;dr<=3;dr++)for(let dc=-3;dc<=3;dc++){const vc=pc+dc,vr=pr+dr;if(vc>=0&&vc<MC&&vr>=0&&vr<MR)tlR.current.add(vc+","+vr);}
let pp="";for(const n of NPCS){const ndx=n.x-pl.x,ndy=n.y-pl.y;if(Math.sqrt(ndx*ndx+ndy*ndy)<ID){pp="Pressiona E \u2014 "+n.name;break;}}if(!pp)for(const c of chR.current){if(c.opn)continue;const ccx=c.col*TP+8,ccy=c.row*TP+8;if(Math.sqrt((ccx-pl.x)**2+(ccy-pl.y)**2)<ID){pp="Pressiona E \u2014 Abrir Cofre";break;}}sPM(pp);}
const dd=dgR.current;if(dd.open){if(dd.t1){dd.i1+=TS*dt;if(dd.i1>=dd.l1.length){dd.i1=dd.l1.length;dd.s1=dd.l1;dd.t1=false;if(dd.l2)dd.t2=true;}else dd.s1=dd.l1.slice(0,Math.floor(dd.i1));dgR.current={...dd};sDl({...dd});}else if(dd.t2){dd.i2+=TS*dt;if(dd.i2>=dd.l2.length){dd.i2=dd.l2.length;dd.s2=dd.l2;dd.t2=false;}else dd.s2=dd.l2.slice(0,Math.floor(dd.i2));dgR.current={...dd};sDl({...dd});}}
wtR.current+=dt;if(wtR.current>=30){wtR.current=0;wfR.current=(wfR.current+1)%2;}ftR.current+=dt;if(ftR.current>=45){ftR.current=0;ffR.current=(ffR.current+1)%FLC.length;}for(const c of chR.current){if(c.af>0&&!c.opn)c.af+=dt*0.04;}
const pts=ptR.current;for(let i=pts.length-1;i>=0;i--){const pp=pts[i];pp.x+=pp.vx*dt;pp.y+=pp.vy*dt;if(pp.gv)pp.vy+=0.05*dt;pp.life-=dt;if(pp.life<=0)pts.splice(i,1);}
const cam=cR.current;const tcx=pl.x*SC-cw/2,tcy=pl.y*SC-ch/2;cam.x+=(tcx-cam.x)*CL*dt;cam.y+=(tcy-cam.y)*CL*dt;cam.x=Math.max(0,Math.min(cam.x,MC*TP*SC-cw));cam.y=Math.max(0,Math.min(cam.y,MR*TP*SC-ch));
cx.clearRect(0,0,cw,ch);cx.fillStyle="#0a0a0a";cx.fillRect(0,0,cw,ch);
const vc0=Math.max(0,Math.floor(cam.x/RT)-2);const vc1=Math.min(MC,Math.ceil((cam.x+cw)/RT)+2);const vr0=Math.max(0,Math.floor(cam.y/RT)-2);const vr1=Math.min(MR,Math.ceil((cam.y+ch)/RT)+2);
for(let r=vr0;r<vr1;r++)for(let c=vc0;c<vc1;c++){const t=GM[r]?.[c];if(t===undefined)continue;dT(cx,t,c*RT-cam.x,r*RT-cam.y,RT,c,r,tlR.current.has(c+","+r),wfR.current,ffR.current);}
for(const c of chR.current){const ccx=c.col*RT-cam.x,ccy=c.row*RT-cam.y;if(ccx<-RT||ccx>cw+RT||ccy<-RT||ccy>ch+RT)continue;if(!tlR.current.has(c.col+","+c.row))continue;dCS(cx,ccx,ccy,c.opn,c.af);}
for(const n of NPCS){const nx=n.x*SC-cam.x,ny=n.y*SC-cam.y;if(nx<-64||nx>cw+64||ny<-64||ny>ch+64)continue;const nc=Math.floor(n.x/TP),nr=Math.floor(n.y/TP);if(!tlR.current.has(nc+","+nr))continue;const ndx=pl.x-n.x,ndy=pl.y-n.y,nd=Math.sqrt(ndx*ndx+ndy*ndy);let nf=DD;if(nd<3*TP)nf=Math.abs(ndx)>Math.abs(ndy)?(ndx>0?DR:DL):(ndy>0?DD:DU);const bn=Math.sin(ts*0.003+n.x)*1.5;dCh(cx,nx,ny,n.bc,n.hc,nf,bn,false,0,nf!==DU);if(nd<3*TP){cx.font="bold 10px sans-serif";cx.textAlign="center";const nw=cx.measureText(n.name).width;cx.fillStyle="rgba(0,0,0,0.7)";cx.fillRect(nx-nw/2-4,ny-28+bn,nw+8,14);cx.fillStyle="#fff";cx.fillText(n.name,nx,ny-18+bn);}if(n.qt&&!tR.current.has(n.id)){cx.fillStyle="#fbbf24";cx.font="bold 16px sans-serif";cx.textAlign="center";cx.fillText("!",nx,ny-24+bn+Math.sin(ts*0.005)*3);}}
{const ppx=pl.x*SC-cam.x,ppy=pl.y*SC-cam.y;dCh(cx,ppx,ppy,"#3b82f6","#713f12",pl.facing,pl.ib,pl.isMoving,pl.wf,pl.facing!==DU);}
for(const pp of pts){const ppx=pp.x*SC-cam.x,ppy=pp.y*SC-cam.y;const alpha=Math.max(0,pp.life/pp.ml);cx.globalAlpha=alpha;if(pp.ch){cx.font=pp.sz*4+"px sans-serif";cx.fillStyle=pp.color;cx.textAlign="center";cx.fillText(pp.ch,ppx,ppy);}else{cx.fillStyle=pp.color;cx.beginPath();cx.arc(ppx,ppy,pp.sz*SC,0,Math.PI*2);cx.fill();}cx.globalAlpha=1;}
const mW=mm==="s"?160:320,mH=mm==="s"?120:240;dMM(cx,cw,mW,mH,tlR.current,chR.current,bR.current,Math.floor(pl.x/TP),Math.floor(pl.y/TP),ts);
rfR.current=requestAnimationFrame(lp);}rfR.current=requestAnimationFrame(lp);return()=>cancelAnimationFrame(rfR.current);},[ph,sz,sP,sQ,sI,mm,iAct,eP,cQ]);

const fmt=(s:number)=>Math.floor(s/60)+"m "+s%60+"s";
const tS=useCallback((d:string)=>{const t=tcR.current;if(d==="u")t.u=true;if(d==="d")t.d=true;if(d==="l")t.l=true;if(d==="r")t.r=true;if(d==="a")t.a=true;},[]);
const tE=useCallback((d:string)=>{const t=tcR.current;if(d==="u")t.u=false;if(d==="d")t.d=false;if(d==="l")t.l=false;if(d==="r")t.r=false;if(d==="a")t.a=false;},[]);

/* MENU SCREEN */
if(ph==="menu"){return(<div className="fixed inset-0 bg-black overflow-hidden flex flex-col items-center justify-center" style={{fontFamily:"var(--font-sora),sans-serif"}}><div className="absolute inset-0">{stR.current.map((s,i)=>(<motion.div key={i} className="absolute rounded-full bg-white" style={{left:(s.x/1200)*100+"%",top:(s.y/800)*100+"%",width:s.s,height:s.s}} animate={{opacity:[s.a,s.a*0.3,s.a]}} transition={{duration:2+Math.random()*2,repeat:Infinity,ease:"easeInOut",delay:Math.random()*2}} />))}</div><motion.div initial={{opacity:0,y:-30}} animate={{opacity:1,y:0}} transition={{duration:1.2}} className="relative z-10 text-center"><h1 className="text-5xl md:text-7xl font-bold text-white mb-2" style={{letterSpacing:"0.15em",textShadow:"0 0 20px rgba(74,222,128,0.5), 0 0 40px rgba(74,222,128,0.3), 2px 2px 0 #166534"}}>DESCOMPLICAI RPG</h1><h2 className="text-xl md:text-2xl text-green-400 font-light tracking-wider" style={{textShadow:"0 0 10px rgba(74,222,128,0.4)"}}>The Quest</h2><p className="text-gray-400 text-sm mt-4">Uma aventura pelo portfolio do Jaime Silva</p></motion.div><motion.div initial={{opacity:0}} animate={{opacity:1}} transition={{delay:1,duration:0.8}} className="relative z-10 mt-12 flex flex-col items-center gap-4"><motion.button onClick={()=>startGame(false)} whileHover={{scale:1.05}} whileTap={{scale:0.95}} className="px-8 py-3 bg-green-600 hover:bg-green-500 text-white font-bold rounded-lg text-lg tracking-wide transition-colors">NOVO JOGO</motion.button>{hs&&<motion.button onClick={()=>startGame(true)} whileHover={{scale:1.05}} whileTap={{scale:0.95}} className="px-8 py-3 bg-blue-600 hover:bg-blue-500 text-white font-bold rounded-lg text-lg tracking-wide transition-colors">CARREGAR JOGO</motion.button>}</motion.div><motion.div initial={{opacity:0}} animate={{opacity:1}} transition={{delay:1.5}} className="relative z-10 mt-10 text-gray-500 text-xs text-center space-y-1"><p>WASD / Setas \u2014 Mover | Shift \u2014 Sprint</p><p>E \u2014 Interagir | Q \u2014 Missoes | I \u2014 Inventario | M \u2014 Mapa</p><p>ESC \u2014 Pausa | F \u2014 FPS</p></motion.div><div className="absolute bottom-4 right-4 text-gray-700 text-xs z-10">v1.0 \u2014 Marco 2026</div><motion.p animate={{opacity:[1,0.3,1]}} transition={{duration:2,repeat:Infinity}} className="absolute bottom-12 text-green-400 text-sm z-10">Pressiona ENTER para comecar</motion.p><MK onEnter={()=>startGame(hs)} /></div>);}

/* VICTORY SCREEN */
if(ph==="win"){return(<div className="fixed inset-0 bg-black overflow-hidden flex flex-col items-center justify-center" style={{fontFamily:"var(--font-sora),sans-serif"}}><div className="absolute inset-0 pointer-events-none">{Array.from({length:80}).map((_,i)=>(<motion.div key={i} className="absolute" style={{left:Math.random()*100+"%",top:"-5%",width:8+Math.random()*8,height:8+Math.random()*8,backgroundColor:["#ef4444","#3b82f6","#22c55e","#eab308","#a855f7","#ec4899"][i%6],borderRadius:Math.random()>0.5?"50%":"0"}} animate={{y:[0,(typeof window!=="undefined"?window.innerHeight:800)+100],x:[0,(Math.random()-0.5)*200],rotate:[0,Math.random()*720],opacity:[1,0.8,0]}} transition={{duration:3+Math.random()*3,repeat:Infinity,delay:Math.random()*2,ease:"easeIn"}} />))}</div><motion.div initial={{scale:0}} animate={{scale:1}} transition={{type:"spring",stiffness:100}} className="relative z-10 text-center"><h1 className="text-4xl md:text-6xl font-bold text-yellow-400 mb-4" style={{textShadow:"0 0 30px rgba(234,179,8,0.6)"}}>LENDA DA DESCOMPLICAI</h1><p className="text-gray-300 text-lg">Completaste todas as missoes!</p></motion.div><motion.div initial={{opacity:0,y:20}} animate={{opacity:1,y:0}} transition={{delay:1}} className="relative z-10 mt-8 grid grid-cols-2 gap-4 text-center"><div className="bg-white/10 rounded-lg p-4"><p className="text-2xl text-yellow-400 font-bold">{fmt(tmR.current)}</p><p className="text-gray-400 text-sm">Tempo</p></div><div className="bg-white/10 rounded-lg p-4"><p className="text-2xl text-green-400 font-bold">15/15</p><p className="text-gray-400 text-sm">NPCs</p></div><div className="bg-white/10 rounded-lg p-4"><p className="text-2xl text-blue-400 font-bold">10/10</p><p className="text-gray-400 text-sm">Cofres</p></div><div className="bg-white/10 rounded-lg p-4"><p className="text-2xl text-purple-400 font-bold">8/8</p><p className="text-gray-400 text-sm">Missoes</p></div></motion.div><motion.p initial={{opacity:0}} animate={{opacity:1}} transition={{delay:2}} className="relative z-10 mt-8 text-gray-300 text-center italic max-w-md">&ldquo;Obrigado por explorares o meu mundo!&rdquo; &mdash; Jaime Silva</motion.p><motion.div initial={{opacity:0}} animate={{opacity:1}} transition={{delay:2.5}} className="relative z-10 mt-8 flex gap-4"><button onClick={()=>{gD();setPh("menu");}} className="px-6 py-3 bg-green-600 hover:bg-green-500 text-white font-bold rounded-lg transition-colors">Jogar Novamente</button><a href="https://descomplicai.pt" target="_blank" rel="noopener noreferrer" className="px-6 py-3 bg-blue-600 hover:bg-blue-500 text-white font-bold rounded-lg transition-colors">Visitar descomplicai.pt</a></motion.div></div>);}

/* PLAYING SCREEN */
return(<div className="fixed inset-0 bg-black overflow-hidden" style={{fontFamily:"var(--font-inter),sans-serif",touchAction:"none"}}><canvas ref={cvR} width={sz.w} height={sz.h} className="absolute inset-0 w-full h-full" style={{imageRendering:"pixelated"}} onClick={()=>{if(dgR.current.open)aDlg();}} />
<AnimatePresence>{zbV&&<motion.div initial={{opacity:0,y:-20}} animate={{opacity:1,y:0}} exit={{opacity:0,y:-20}} className="absolute top-16 left-1/2 -translate-x-1/2 z-30"><div className="bg-black/80 px-6 py-2 rounded-full border border-white/20"><p className="text-white text-sm font-bold tracking-wider">{zb}</p></div></motion.div>}</AnimatePresence>
<div className="absolute top-3 left-3 z-20"><div className="bg-black/70 rounded-lg p-2.5 text-xs text-white min-w-[180px]">{(()=>{const a=qS.find(q=>!q.done);if(!a)return<p className="text-green-400">Todas as missoes completas!</p>;return(<><p className="text-yellow-400 font-bold text-[10px] mb-1">MISSAO ATIVA</p><p className="font-medium">{a.name}</p><p className="text-gray-400 text-[10px]">{a.desc}</p><div className="mt-1 bg-gray-700 rounded-full h-1.5"><div className="bg-green-500 rounded-full h-1.5 transition-all" style={{width:(a.prg/a.tgt)*100+"%"}} /></div><p className="text-gray-500 text-[10px] mt-0.5">{a.prg}/{a.tgt}</p></>);})()}</div></div>
<div className="absolute top-[140px] right-3 z-20"><div className="bg-black/70 rounded-lg px-3 py-1.5 text-xs text-white flex items-center gap-1"><span>{bS.size}/10</span><span>{"\u{1F3C5}"}</span></div></div>
<AnimatePresence>{pm&&!dl.open&&<motion.div initial={{opacity:0}} animate={{opacity:1}} exit={{opacity:0}} className="absolute bottom-24 md:bottom-16 left-1/2 -translate-x-1/2 z-20"><div className="bg-black/80 px-4 py-2 rounded-lg border border-yellow-500/50"><p className="text-yellow-400 text-sm font-medium">{pm}</p></div></motion.div>}</AnimatePresence>
<div className="absolute bottom-2 left-1/2 -translate-x-1/2 z-10 hidden md:block"><p className="text-gray-600 text-[10px]">WASD \u2014 Mover | E \u2014 Interagir | Q \u2014 Missoes | I \u2014 Inventario | M \u2014 Mapa | ESC \u2014 Pausa</p></div>
{sF&&<div className="absolute bottom-3 right-3 z-20"><div className="bg-black/70 rounded px-2 py-1 text-[10px] text-green-400 font-mono">{fv} FPS</div></div>}
<AnimatePresence>{qn&&<motion.div initial={{y:-60}} animate={{y:0}} exit={{y:-60}} className="absolute top-0 left-0 right-0 z-50"><div className="bg-gradient-to-r from-yellow-600 to-yellow-500 py-3 text-center"><p className="text-white font-bold text-lg">{qn}</p></div></motion.div>}</AnimatePresence>
<AnimatePresence>{cn&&<motion.div initial={{opacity:0,scale:0.8}} animate={{opacity:1,scale:1}} exit={{opacity:0,scale:0.8}} className="absolute top-20 left-1/2 -translate-x-1/2 z-50"><div className="bg-yellow-900/90 border border-yellow-500 px-6 py-3 rounded-xl"><p className="text-yellow-300 font-bold text-lg">{cn}</p></div></motion.div>}</AnimatePresence>
<AnimatePresence>{dl.open&&<motion.div initial={{y:20,opacity:0}} animate={{y:0,opacity:1}} exit={{y:20,opacity:0}} className="absolute bottom-0 left-0 right-0 z-40" onClick={e=>{e.stopPropagation();aDlg();}}><div className="bg-gray-900/95 border-t-2 border-blue-500" style={{height:160}}><div className="px-4 py-1.5 text-sm font-bold" style={{backgroundColor:dl.nC+"33",color:dl.nC}}>{dl.nN}</div><div className="flex p-4"><div className="flex-shrink-0 mr-4"><div className="w-16 h-16 rounded-full flex items-center justify-center" style={{backgroundColor:dl.nC+"44",border:"2px solid "+dl.nC}}><div className="w-10 h-10 rounded-full" style={{backgroundColor:"#fcd6b0"}} /></div></div><div className="flex-1 min-w-0"><p className="text-white text-sm leading-relaxed">{dl.s1}</p>{(dl.s2||dl.t2)&&<p className="text-gray-300 text-sm leading-relaxed mt-1">{dl.s2}</p>}</div></div><div className="absolute bottom-2 right-4 flex gap-1.5 items-center">{dl.pgs.map((_,i)=><div key={i} className={"w-2 h-2 rounded-full "+(i===dl.pg?"bg-white":"bg-gray-600")} />)}<span className="text-gray-500 text-[10px] ml-2">{dl.pg+1}/{dl.pgs.length}</span></div><motion.p animate={{opacity:[0.5,1,0.5]}} transition={{duration:1.5,repeat:Infinity}} className="absolute bottom-2 left-4 text-gray-500 text-[10px]">Clica ou pressiona E</motion.p></div></motion.div>}</AnimatePresence>
<AnimatePresence>{sQ&&<motion.div initial={{opacity:0}} animate={{opacity:1}} exit={{opacity:0}} className="absolute inset-0 z-50 flex items-center justify-center bg-black/80" onClick={()=>sSQ(false)}><motion.div initial={{scale:0.9}} animate={{scale:1}} exit={{scale:0.9}} className="bg-gray-900 border border-gray-700 rounded-xl p-6 max-w-lg w-full mx-4 max-h-[80vh] overflow-y-auto" onClick={e=>e.stopPropagation()}><h2 className="text-2xl font-bold text-white mb-4">{"\u{1F4CB}"} Missoes</h2><div className="space-y-3">{qS.map(q=><div key={q.id} className={"rounded-lg p-3 border "+(q.done?"bg-yellow-900/30 border-yellow-600":"bg-gray-800 border-gray-700")}><div className="flex items-center justify-between mb-1"><p className="text-white font-bold text-sm flex items-center gap-2">{q.done?"\u2705":"\u2B1C"} {q.name}</p><span className="text-lg">{q.emo}</span></div><p className="text-gray-400 text-xs mb-2">{q.desc}</p><div className="bg-gray-700 rounded-full h-2"><div className={"rounded-full h-2 transition-all "+(q.done?"bg-yellow-500":"bg-green-500")} style={{width:(q.prg/q.tgt)*100+"%"}} /></div><p className="text-gray-500 text-[10px] mt-1">{q.prg}/{q.tgt}{q.done&&" \u2014 "+q.rwd}</p></div>)}</div><button onClick={()=>sSQ(false)} className="mt-4 w-full py-2 bg-gray-800 hover:bg-gray-700 text-gray-300 rounded-lg text-sm">Fechar (Q)</button></motion.div></motion.div>}</AnimatePresence>
<AnimatePresence>{sI&&<motion.div initial={{opacity:0}} animate={{opacity:1}} exit={{opacity:0}} className="absolute inset-0 z-50 flex items-center justify-center bg-black/80" onClick={()=>sSI(false)}><motion.div initial={{scale:0.9}} animate={{scale:1}} exit={{scale:0.9}} className="bg-gray-900 border border-gray-700 rounded-xl p-6 max-w-lg w-full mx-4 max-h-[80vh] overflow-y-auto" onClick={e=>e.stopPropagation()}><h2 className="text-2xl font-bold text-white mb-4">{"\u{1F392}"} Inventario</h2><p className="text-gray-400 text-xs mb-2">Tech Badges \u2014 {bS.size}/10</p><div className="grid grid-cols-5 gap-2 mb-6">{fC().map(ch=>{const g=bS.has(ch.id);return<div key={ch.id} className={"aspect-square rounded-lg flex flex-col items-center justify-center p-1 text-center "+(g?"bg-yellow-900/40 border border-yellow-600":"bg-gray-800 border border-gray-700")}><span className="text-2xl">{g?ch.be:"\u{1F512}"}</span><p className="text-[9px] text-gray-400 mt-1">{g?ch.bdg:"???"}</p></div>;})}</div><div className="border-t border-gray-700 pt-4"><h3 className="text-sm font-bold text-white mb-3">Estatisticas</h3><div className="grid grid-cols-2 gap-3 text-sm"><div className="bg-gray-800 rounded-lg p-3"><p className="text-gray-400 text-[10px]">Tempo</p><p className="text-white font-bold">{fmt(td)}</p></div><div className="bg-gray-800 rounded-lg p-3"><p className="text-gray-400 text-[10px]">NPCs</p><p className="text-white font-bold">{tc}/15</p></div><div className="bg-gray-800 rounded-lg p-3"><p className="text-gray-400 text-[10px]">Zonas</p><p className="text-white font-bold">{zc}/5</p></div><div className="bg-gray-800 rounded-lg p-3"><p className="text-gray-400 text-[10px]">Missoes</p><p className="text-white font-bold">{qS.filter(q=>q.done).length}/8</p></div></div></div><button onClick={()=>sSI(false)} className="mt-4 w-full py-2 bg-gray-800 hover:bg-gray-700 text-gray-300 rounded-lg text-sm">Fechar (I)</button></motion.div></motion.div>}</AnimatePresence>
<AnimatePresence>{sP&&<motion.div initial={{opacity:0}} animate={{opacity:1}} exit={{opacity:0}} className="absolute inset-0 z-50 flex items-center justify-center bg-black/80"><motion.div initial={{scale:0.9}} animate={{scale:1}} exit={{scale:0.9}} className="bg-gray-900 border border-gray-700 rounded-xl p-8 text-center"><h2 className="text-3xl font-bold text-white mb-8">PAUSA</h2><div className="flex flex-col gap-3 min-w-[200px]"><button onClick={()=>sSP(false)} className="py-3 bg-green-600 hover:bg-green-500 text-white font-bold rounded-lg">Continuar</button><button onClick={()=>{gS(pR.current,zR.current,tR.current,bR.current,qR.current,tmR.current,tlR.current);sSP(false);}} className="py-3 bg-blue-600 hover:bg-blue-500 text-white font-bold rounded-lg">Guardar</button><button onClick={()=>{sSP(false);sSQ(true);}} className="py-3 bg-gray-700 hover:bg-gray-600 text-white font-bold rounded-lg">Missoes</button><button onClick={()=>{sSP(false);sSI(true);}} className="py-3 bg-gray-700 hover:bg-gray-600 text-white font-bold rounded-lg">Inventario</button><button onClick={()=>{gD();setPh("menu");}} className="py-3 bg-red-900 hover:bg-red-800 text-red-300 font-bold rounded-lg mt-2">Reiniciar</button></div><p className="text-gray-600 text-xs mt-4">ESC para voltar</p></motion.div></motion.div>}</AnimatePresence>
<div className="md:hidden absolute z-30"><div className="fixed bottom-6 left-4 flex flex-col items-center gap-1"><button onTouchStart={e=>{e.preventDefault();tS("u");}} onTouchEnd={()=>tE("u")} className="w-14 h-14 bg-white/15 rounded-xl flex items-center justify-center active:bg-white/30 select-none"><span className="text-white text-xl">{"\u25B2"}</span></button><div className="flex gap-1"><button onTouchStart={e=>{e.preventDefault();tS("l");}} onTouchEnd={()=>tE("l")} className="w-14 h-14 bg-white/15 rounded-xl flex items-center justify-center active:bg-white/30 select-none"><span className="text-white text-xl">{"\u25C0"}</span></button><div className="w-14 h-14" /><button onTouchStart={e=>{e.preventDefault();tS("r");}} onTouchEnd={()=>tE("r")} className="w-14 h-14 bg-white/15 rounded-xl flex items-center justify-center active:bg-white/30 select-none"><span className="text-white text-xl">{"\u25B6"}</span></button></div><button onTouchStart={e=>{e.preventDefault();tS("d");}} onTouchEnd={()=>tE("d")} className="w-14 h-14 bg-white/15 rounded-xl flex items-center justify-center active:bg-white/30 select-none"><span className="text-white text-xl">{"\u25BC"}</span></button></div><button onTouchStart={e=>{e.preventDefault();tS("a");}} onTouchEnd={()=>tE("a")} className="fixed bottom-10 right-6 w-16 h-16 bg-yellow-500/30 border-2 border-yellow-500 rounded-full flex items-center justify-center active:bg-yellow-500/50 select-none"><span className="text-yellow-400 font-bold text-lg">E</span></button><div className="fixed top-2 right-2 flex gap-1.5"><button onClick={()=>sSQ(true)} className="w-9 h-9 bg-black/60 rounded-lg flex items-center justify-center"><span className="text-sm">{"\u{1F4CB}"}</span></button><button onClick={()=>sSI(true)} className="w-9 h-9 bg-black/60 rounded-lg flex items-center justify-center"><span className="text-sm">{"\u{1F392}"}</span></button><button onClick={()=>sMM(p=>p==="s"?"l":"s")} className="w-9 h-9 bg-black/60 rounded-lg flex items-center justify-center"><span className="text-sm">{"\u{1F5FA}\uFE0F"}</span></button><button onClick={()=>sSP(true)} className="w-9 h-9 bg-black/60 rounded-lg flex items-center justify-center"><span className="text-sm">{"\u23F8\uFE0F"}</span></button></div></div>
</div>);}

function MK({onEnter}:{onEnter:()=>void}){useEffect(()=>{const h=(e:KeyboardEvent)=>{if(e.key==="Enter")onEnter();};window.addEventListener("keydown",h);return()=>window.removeEventListener("keydown",h);},[onEnter]);return null;}
