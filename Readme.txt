This is a blockchain based chess game, where moves are store on blockchain via metamask. Users have to input the black and the white players 
wallet addresses so that it can send nft to the winner. After one user manages to checkmate the other, the game ends and the winner of the game is given an NFT which is made by my own nft contract .

The nft is based on the ERC721 standards.

The Frontend is made using chess.js and chessboard.js, with standard functions. Then, I have made a solidity contract that contain an array of structs for storing the game, and a _setter and _getter and you can also get any black and white moves by just telling the index of move. I integrated it with react using ABI and contract Address using standard codes. Then, I made another solidity contract, where each time the _mint function is called, the contract mints a new NFT using the _mint function which I had taken from (openzepplin ERC721 file). The function is given the address of the winner, and it transfers the minted NFT.
