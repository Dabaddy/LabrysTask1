//read file
const fs = require('fs')
//refer to the helper file for network configuration
let { networkConfig } = require('../helper-hardhat-config')


//namedAccounts looks in our config file for our named accounts
//deployments gets us logging
//chainId helps with testing and testnets
module.exports = async ({
    getNamedAccounts,
    deployments,
    getChainId
}) => {

    //Get variables
    const { deploy, log } = deployments
    const { deployer } = await getNamedAccounts()
    const chainId = await getChainId()

    //A bit of formatting for ease of reading
    log("----------------------------------------------------")
    //Look in our contracts folder for 'SVGNFT and deploy it
    const SVGNFT = await deploy('SVGNFT', {
        from: deployer,
        log: true
    })
    log("----------------------------------------------------")
    log(`You have deployed an NFT contract to ${SVGNFT.address}`)
    //read image file
    let filepath = "./img/circle.svg"
    let svg = fs.readFileSync(filepath, { encoding: "utf8" })

    //get all the contract information from our contract
    const svgNFTContract = await ethers.getContractFactory("SVGNFT")
    //an account to sign our transactions
    const accounts = await hre.ethers.getSigners()
    const signer = accounts[0]
    //Get the SVG contract
    const svgNFT = new ethers.Contract(SVGNFT.address, svgNFTContract.interface, signer)
    //This refers to the helper config file 
    const networkName = networkConfig[chainId]['name']
    log("----------------------------------------------------")


    //Allows us to read code and aquire checkmark on etherscan
    log(`Verify with:\n npx hardhat verify --network ${networkName} ${svgNFT.address}`)
    log("Let's create an NFT now!")

    //creat and instance of our NFT collection by calling create
    //svgNFT.create take the ethers contract and all is variables 
    let transactionsResponse = await svgNFT.create(svg)
    //wait 1 block for the transaciton to complete
    let receipt = await transactionsResponse.wait(1)
    log('You made and NFT!')
    log("----------------------------------------------------")
    log(`You can view the tokenURI here ${await svgNFT.tokenURI(0)}`)






}