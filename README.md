## Introducere
Vegchain este o aplicatie conceputa pentru a rezolva problemele specifice din cadrul lanturilor de aprovizionare de legume, folosind caracteristicile unice ale tehnologiei blockchain, folosind Hyperledger Fabric, o platforma de blockchain open-source. 

## Tehnologii folosite
- Server : Cluster Kubernetes pentru conformarea cu principiul de decentralizare al proiectului
- Blockchain : Hyperledger Fabric, configuratie formata din doua organizatii
- Frontend : Vite, React, TailwindUI, TailwindCSS, AceternityUI
- Backend : Typescript, NodeJS, ExpressJS
- Security : JSONWebToken, BCrypt
- Database : SQLite3
- Chaincode : Typescript

## Descrierea Aplicatiei
Aplicatia este alcatuita din mai multe parti:

- Un Restful API, scris in TypeScript, care interactioneaza cu retea blockchain prin intermediul serviciului Fabric Gateway. Acesta permite autentificarea utilizatorilor, initierea tranzactiilor si obtinerea de informatii despre starea lantului de aprovizionare.

- Un chaincode, scris in TypeScript, care definește logica tranzacțiilor din cadrul rețelei blockchain. 

- Un director '/temp', care contine fisierul de configurare a retelei blockchain. Acesta defineste structura retelei, inclusiv participantii si regulile de consens.

## Ce probleme rezolvă?
Supply-chain-ul de legume se confrunta cu numeroase provocari, cum ar fi lipsa de transparenta, riscul de fraudă si timpi de procesare lungi. Hyperledger Fabric ne ajută să rezolvăm aceste probleme în modul următor:

- Îmbunătățirea transparenței: Fiind un registru distribuit, toate tranzacțiile sunt înregistrate și sunt vizibile pentru toți participanții. 

- Reducerea fraudei: Prin utilizarea smart contract-urilor (chaincode), putem impune reguli stricte care previn vânzarea de produse contrafacute sau necorespunzătoare.

- Accelerarea procesării: Prin automatizarea proceselor prin smart contract-uri și API-uri, putem reduce timpul necesar procesării tranzacțiilor și a informațiilor.

## Cum funcționează Hyperledger Fabric?

Hyperledger Fabric este o platformă de blockchain dezvoltată de Linux Foundation, gândită pentru utilizarea în medii corporatiste. Este un sistem open-source pentru reţele blockchain permisive, unde participanţii trebuie să fie pre-autorizaţi pentru a i se alătura reţelei. 

In termeni mai simpli, Hyperledger Fabric este un blockchain special construit pentru a facilita tranzactiile si procesele de afaceri. Imagineaza-ti ca este un jurnal digital unde fiecare intrare (sau tranzactie) este inregistrata, verificabila si nu poate fi alterata odata ce a fost adaugata.

De exemplu, avem module pentru identitatea digitala, care asigura ca toate entitatile din retea sunt autentice si autorizate. Avem module pentru sistemul de consens - partea care stabileste cum sunt validate tranzactiile. Acestea pot fi modificate si schimbate in functie de nevoile specifice ale unei afaceri, oferind un nivel de flexibilitate care nu este disponibil in alte retele blockchain.

Hyperledger Fabric are, de asemenea, un sistem unic numit chaincode, care este echivalentul contractelor inteligente din alte retele blockchain. Acesta reprezinta regulile si logica care guverneaza tranzactiile in cadrul retelei.

In ultimul rand, Hyperledger Fabric poate gestiona canale private, ceea ce inseamna ca poti avea tranzactii private intre membrii retelei, fara ca acestea sa fie vizibile tuturor. Acest lucru este ideal pentru afaceri care necesita un grad inalt de confidentialitate si securitate.

Gandeste-te la Hyperledger Fabric ca la un sistem de trenuri. Fiecare tren (sau tranzactie) calatoreste pe un anumit traseu (sau canal), iar biletele (sau permisiunile) sunt verificate la fiecare statie (sau nod). Regulile calatoriei sunt stabilite de un set de reguli (sau contract inteligent) si toata lumea in tren accepta aceste reguli. Iar pentru securitate si eficienta, fiecare tranzactie este confirmata si validata de catre consiliul de conducere (sau sistemul de consens).
