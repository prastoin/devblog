---
title: Corewar
imageName: corewar
publishDate: 13 jun 2019
githubRepoUrl: https://github.com/prastoin/corewar
peopleCounter: 3
productionUrl: https://corewar.netlify.app/
tags: [C, WebAssembly, Vue, Three.js]
is42Project: true
---

The corewar regroups:

An ASM compiler, that convert Corewar Champions file ".s", into binaries files “.cor” that are readable by the Virtual Machine.

The Virtual Machine is the arena, where everything takes sense, rules of the game are checked by the vm.

Champions, they are reading the circular memory and applying the instructions they receive.
The main instruction is “live: champion’s number".
A Champion dies if he doesn’t call a live in CYCLE_TO_DIE cycles.
When all processes are dead, last calling live champions is checked to elect a winner.
