import { useState, useMemo, useCallback, useEffect } from "react";
import { Chessboard } from "react-chessboard";
import { Chess } from "chess.js";
import CustomDialog from "./components/CustomDialog";
import Web3 from 'web3';
import InputForm from "./input.js";

function Game({ players, room, orientation, cleanup }) {
  const chess = useMemo(() => new Chess(), []); // <- 1
  const [fen, setFen] = useState(chess.fen()); // <- 2
  const [over, setOver] = useState("");

  async function blockchain(result) {
    if (typeof window.ethereum !== 'undefined') {
      try {
        // Request account access
        await window.ethereum.request({ method: 'eth_requestAccounts' });
  
        // Initialize Web3 with the current provider
        const web3 = new Web3(window.ethereum);
  
        // Get the user's Ethereum address
        const accounts = await web3.eth.getAccounts();
        const userAddress = accounts[0];
  
        // Your contract ABI and address
        const contractAddress = '0xd8b934580fcE35a11B58C6D73aDeE468a2833fa8'; 
        const contractABI = 
		[
	{
		"inputs": [
			{
				"internalType": "string",
				"name": "_color",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "_piece",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "_from",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "_to",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "_san",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "_flags",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "_lan",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "_before",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "_after",
				"type": "string"
			}
		],
		"name": "addChessMove",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": true,
				"internalType": "address",
				"name": "owner",
				"type": "address"
			},
			{
				"indexed": true,
				"internalType": "address",
				"name": "approved",
				"type": "address"
			},
			{
				"indexed": true,
				"internalType": "uint256",
				"name": "tokenId",
				"type": "uint256"
			}
		],
		"name": "Approval",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": true,
				"internalType": "address",
				"name": "owner",
				"type": "address"
			},
			{
				"indexed": true,
				"internalType": "address",
				"name": "operator",
				"type": "address"
			},
			{
				"indexed": false,
				"internalType": "bool",
				"name": "approved",
				"type": "bool"
			}
		],
		"name": "ApprovalForAll",
		"type": "event"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "to",
				"type": "address"
			},
			{
				"internalType": "uint256",
				"name": "tokenId",
				"type": "uint256"
			}
		],
		"name": "approve",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": true,
				"internalType": "address",
				"name": "previousOwner",
				"type": "address"
			},
			{
				"indexed": true,
				"internalType": "address",
				"name": "newOwner",
				"type": "address"
			}
		],
		"name": "OwnershipTransferred",
		"type": "event"
	},
	{
		"inputs": [],
		"name": "renounceOwnership",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "to",
				"type": "address"
			}
		],
		"name": "safeMint",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "from",
				"type": "address"
			},
			{
				"internalType": "address",
				"name": "to",
				"type": "address"
			},
			{
				"internalType": "uint256",
				"name": "tokenId",
				"type": "uint256"
			}
		],
		"name": "safeTransferFrom",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "from",
				"type": "address"
			},
			{
				"internalType": "address",
				"name": "to",
				"type": "address"
			},
			{
				"internalType": "uint256",
				"name": "tokenId",
				"type": "uint256"
			},
			{
				"internalType": "bytes",
				"name": "_data",
				"type": "bytes"
			}
		],
		"name": "safeTransferFrom",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "operator",
				"type": "address"
			},
			{
				"internalType": "bool",
				"name": "approved",
				"type": "bool"
			}
		],
		"name": "setApprovalForAll",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": true,
				"internalType": "address",
				"name": "from",
				"type": "address"
			},
			{
				"indexed": true,
				"internalType": "address",
				"name": "to",
				"type": "address"
			},
			{
				"indexed": true,
				"internalType": "uint256",
				"name": "tokenId",
				"type": "uint256"
			}
		],
		"name": "Transfer",
		"type": "event"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "from",
				"type": "address"
			},
			{
				"internalType": "address",
				"name": "to",
				"type": "address"
			},
			{
				"internalType": "uint256",
				"name": "tokenId",
				"type": "uint256"
			}
		],
		"name": "transferFrom",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "newOwner",
				"type": "address"
			}
		],
		"name": "transferOwnership",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint32",
				"name": "_index",
				"type": "uint32"
			}
		],
		"name": "_getBlackMoves",
		"outputs": [
			{
				"components": [
					{
						"internalType": "string",
						"name": "color",
						"type": "string"
					},
					{
						"internalType": "string",
						"name": "piece",
						"type": "string"
					},
					{
						"internalType": "string",
						"name": "from",
						"type": "string"
					},
					{
						"internalType": "string",
						"name": "to",
						"type": "string"
					},
					{
						"internalType": "string",
						"name": "san",
						"type": "string"
					},
					{
						"internalType": "string",
						"name": "flags",
						"type": "string"
					},
					{
						"internalType": "string",
						"name": "lan",
						"type": "string"
					},
					{
						"internalType": "string",
						"name": "before",
						"type": "string"
					},
					{
						"internalType": "string",
						"name": "after1",
						"type": "string"
					}
				],
				"internalType": "struct ChessGame.ChessMove",
				"name": "",
				"type": "tuple"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "_getCount",
		"outputs": [
			{
				"internalType": "uint32",
				"name": "",
				"type": "uint32"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint32",
				"name": "_index",
				"type": "uint32"
			}
		],
		"name": "_getMoves",
		"outputs": [
			{
				"components": [
					{
						"internalType": "string",
						"name": "color",
						"type": "string"
					},
					{
						"internalType": "string",
						"name": "piece",
						"type": "string"
					},
					{
						"internalType": "string",
						"name": "from",
						"type": "string"
					},
					{
						"internalType": "string",
						"name": "to",
						"type": "string"
					},
					{
						"internalType": "string",
						"name": "san",
						"type": "string"
					},
					{
						"internalType": "string",
						"name": "flags",
						"type": "string"
					},
					{
						"internalType": "string",
						"name": "lan",
						"type": "string"
					},
					{
						"internalType": "string",
						"name": "before",
						"type": "string"
					},
					{
						"internalType": "string",
						"name": "after1",
						"type": "string"
					}
				],
				"internalType": "struct ChessGame.ChessMove",
				"name": "",
				"type": "tuple"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint32",
				"name": "_index",
				"type": "uint32"
			}
		],
		"name": "_getWhiteMoves",
		"outputs": [
			{
				"components": [
					{
						"internalType": "string",
						"name": "color",
						"type": "string"
					},
					{
						"internalType": "string",
						"name": "piece",
						"type": "string"
					},
					{
						"internalType": "string",
						"name": "from",
						"type": "string"
					},
					{
						"internalType": "string",
						"name": "to",
						"type": "string"
					},
					{
						"internalType": "string",
						"name": "san",
						"type": "string"
					},
					{
						"internalType": "string",
						"name": "flags",
						"type": "string"
					},
					{
						"internalType": "string",
						"name": "lan",
						"type": "string"
					},
					{
						"internalType": "string",
						"name": "before",
						"type": "string"
					},
					{
						"internalType": "string",
						"name": "after1",
						"type": "string"
					}
				],
				"internalType": "struct ChessGame.ChessMove",
				"name": "",
				"type": "tuple"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "owner",
				"type": "address"
			}
		],
		"name": "balanceOf",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"name": "Blackmoves",
		"outputs": [
			{
				"internalType": "string",
				"name": "color",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "piece",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "from",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "to",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "san",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "flags",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "lan",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "before",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "after1",
				"type": "string"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"name": "chessMoves",
		"outputs": [
			{
				"internalType": "string",
				"name": "color",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "piece",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "from",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "to",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "san",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "flags",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "lan",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "before",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "after1",
				"type": "string"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "tokenId",
				"type": "uint256"
			}
		],
		"name": "getApproved",
		"outputs": [
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "owner",
				"type": "address"
			},
			{
				"internalType": "address",
				"name": "operator",
				"type": "address"
			}
		],
		"name": "isApprovedForAll",
		"outputs": [
			{
				"internalType": "bool",
				"name": "",
				"type": "bool"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "name",
		"outputs": [
			{
				"internalType": "string",
				"name": "",
				"type": "string"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "owner",
		"outputs": [
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "tokenId",
				"type": "uint256"
			}
		],
		"name": "ownerOf",
		"outputs": [
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "bytes4",
				"name": "interfaceId",
				"type": "bytes4"
			}
		],
		"name": "supportsInterface",
		"outputs": [
			{
				"internalType": "bool",
				"name": "",
				"type": "bool"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "symbol",
		"outputs": [
			{
				"internalType": "string",
				"name": "",
				"type": "string"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "tokenId",
				"type": "uint256"
			}
		],
		"name": "tokenURI",
		"outputs": [
			{
				"internalType": "string",
				"name": "",
				"type": "string"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "totalSupply",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"name": "Whitemoves",
		"outputs": [
			{
				"internalType": "string",
				"name": "color",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "piece",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "from",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "to",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "san",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "flags",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "lan",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "before",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "after1",
				"type": "string"
			}
		],
		"stateMutability": "view",
		"type": "function"
	}
];
  
        // Create a contract instance
        const contract = new web3.eth.Contract(contractABI, contractAddress);
  
        // Call the contract's addChessMove function
        const receipt = await contract.methods
        .addChessMove(
          result.color,
          result.piece,
          result.from,
          result.to,
          result.san,
          result.flags,
          result.lan,
          result.before,
          result.after
        )
        .send({ from: userAddress });

  
        console.log('Transaction successful');
        
        // You can also interact with other contract functions or retrieve data here
      } catch (error) {
        console.error('Error:', error);
      }
    } else {
      // Handle the case where MetaMask is not installed
      console.log('Please install MetaMask to use this app.');
    }
  }
  

  const makeAMove = useCallback(
    (move) => {
      try {
        const result = chess.move(move); // update Chess instance
        blockchain(result)

        setFen(chess.fen()); // update fen state to trigger a re-render
        
        // console.log("over, checkmate", chess.isGameOver(), chess.isCheckmate());
  
        if (chess.isGameOver()) { // check if move led to "game over"
          if (chess.isCheckmate()) { // if reason for game over is a checkmate
            // Set message to checkmate. 
            setOver(
              `Checkmate! ${chess.turn() === "w" ? "black" : "white"} wins!`
            ); 
            // The winner is determined by checking which side made the last move
          } else if (chess.isDraw()) { // if it is a draw
            setOver("Draw"); // set message to "Draw"
          } else {
            setOver("Game over");
          }
        }
  
        return result;
      } catch (e) {
        return null;
      } // null if the move was illegal, the move object if the move was legal
    },
    [chess]
  );
    
  // onDrop function
  function onDrop(sourceSquare, targetSquare) {
    const moveData = {
      from: sourceSquare,
      to: targetSquare,
      color: chess.turn(),
      // promotion: "q",
    };
    // console.log(moveData);
    const move = makeAMove(moveData);

    // illegal move
    if (move === null) return false;

    return true;
  }
  
  // Game component returned jsx
  return (
    <>
		<InputForm winner={chess.turn() === "w" ? "black" : "white"}></InputForm>
      <div className="board">
        <Chessboard position={fen} onPieceDrop={onDrop} />  {/**  <- 4 */}
      </div>
      <CustomDialog // <- 5
        open={Boolean(over)}
        title={over}
        contentText={over}
        handleContinue={() => {
          setOver("");
        }}
      />
    </>
  );
}

export default Game;