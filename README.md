# Sympinator frontend

Maturitní projekt Ondry Tkaczyszyna.

**!!V ideálním případě obsah tohohle repozitáře za chvíli nebude vůbec nic dělat sám o sobe, je třeba jej stáhnout jako
submodule k [github.com/ondrax/sympinator-be](backendu)!!** (příp. instrukce v jeho README)

Nicméně:

## Prerekvizity ke spuštění samostatného frontendu
1. `docker`
2. (`make`) — momentálně pro pohodlnost — lze se tomu vyhnout
3. shell

## Spuštění
Pro live reload server:
```
$ make up
```
_nebo_ (lokálně, mimo docker, předpokládá instalaci `npm`)
```
$ npm init
$ npm run start
```
