//Give the contract some SVG code
//Output an NFT URI with this SVG code
//Storing all the NFT metadata on-chain

//SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;
//Library used for storing metadate
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
//Library used for manipulating the svg URI
import "base64-sol/base64.sol";



contract SVGNFT is ERC721URIStorage {

    uint256 tokenCounter;
    //Event for every time we create a NFT
    event CreatedSVGNFT(uint256 indexed tokenId, string tokenURI);

    //Constructor, Give it a name and symbol
    constructor() ERC721("SVG NFT", "svgNFT") {
        tokenCounter = 0;
    }

    //create a mint function. Pass svg code to store NFT metadata on-chain (need tokenURI)
    function create(string memory _svg) public {
        //Using the 721 library use safemint to mint
        _safeMint(msg.sender, tokenCounter);
        //Image URI
        string memory imageURI = svgToImageURI(_svg);
        //Token URI
        string memory tokenURI = formatTokenURI(imageURI);
        //For each NFT set its unique token URI
        _setTokenURI(tokenCounter, tokenURI);
        //Emit an event everytime an NFT is minted
        emit CreatedSVGNFT(tokenCounter, tokenURI);
        //keep track of tokens minted
        tokenCounter = tokenCounter + 1;

    }

    //function to turn our SVG code to URI
    function svgToImageURI(string memory _svg) public pure returns (string memory) {
        // example:
        // <svg width='500' height='500' viewBox='0 0 285 350' fill='none' xmlns='http://www.w3.org/2000/svg'><path fill='black' d='M150,0,L75,200,L225,200,Z'></path></svg>
        // data:image/svg+xml;base64,
        string memory baseURL = "data:image/svg+xml;base64,";
        //Base 64 encoded version of our SVG
        //PHN2ZyB3aWR0aD0nNTAwJyBoZWlnaHQ9JzUwMCcgdmlld0JveD0nMCAwIDI4NSAzNTAnIGZpbGw9J25vbmUnIHhtbG5zPSdodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2Zyc+PHBhdGggZmlsbD0nYmxhY2snIGQ9J00xNTAsMCxMNzUsMjAwLEwyMjUsMjAwLFonPjwvcGF0aD48L3N2Zz4=
        string memory svgBase64Encoded = Base64.encode(bytes(string(abi.encodePacked(_svg))));
        //Concat the two strings
        return string(abi.encodePacked(baseURL,svgBase64Encoded));
    }

    //Function to create token URI by wrapping image URI + metadata + baseURL
function formatTokenURI(string memory _imageURI) public pure returns (string memory) {
        //Create a json of the token URI, which is the metadata and image URI
        //Concat the two strings like in svgToImage
        //string(abi.encodePacked(Base64.encode(bytes(string(abi.encodePacked(svg)))))
        return string(
                abi.encodePacked(
                    "data:application/json;base64,",
                    Base64.encode(
                        bytes(
                            abi.encodePacked(
                                '{"name": "SVG NFT", ', // You can add whatever name here
                                '"description": "An NFT based on SVG!", ',
                                '"attributes": "", ',
                                '"image": "', _imageURI, '"}'
                            )
                        )
                    )
                )
            );
    }


}



