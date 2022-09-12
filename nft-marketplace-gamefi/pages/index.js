import { ethers } from 'ethers';
import { useEffect, useState } from 'react';
import axios from 'axios';
import Web3Modal from "web3modal";
import { useRouter } from 'next/router';

import NFT from '../engine/NFT.json';

import { Grid, Card, Text, Button, Row, Spacer, Container } from '@nextui-org/react';

import { hhresell, hhnftcol, mainnet } from '../engine/configuration';
import { ropsten, ropstenNFTcontract, cipherEth  } from '../engine/configuration';

import { cipherHH, simpleCrypto } from '../engine/configuration';
import confetti from 'canvas-confetti';
import 'sf-font';
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";

export default function Home() {
  const [hhlist, ropstenNFTcontractsell] = useState([])
  useEffect(() => {
    loadHardHatResell()
  }, [ropstenNFTcontractsell])

  const handleConfetti = () => {
    confetti();
  };
  const router = useRouter()

  async function loadHardHatResell() {
    const provider = new ethers.providers.JsonRpcProvider(ropsten)
    const key = simpleCrypto.decrypt(cipherEth)
    
    const wallet = new ethers.Wallet(key, provider);
    
    const contract = new ethers.Contract(ropstenNFTcontract, NFT, wallet);

    const itemArray = [];
    const owner2 = await contract._tokenIds().then(result => {console.log("tokenids  " + result)})
    contract._tokenIds().then(async result => {
      for (let i = 0; i < result; i++) {
        var token = i + 1         
        var owner = await contract.ownerOf(token)
        if (owner == ropstenNFTcontract) {
                let test = await contract.Items(token)
                const rawUri = await contract.tokenURI(token)
                let metadata = await axios.get(rawUri)
                let rawImg = metadata.data.image
                var name = metadata.data.name
                var desc = metadata.data.description
                let image = rawImg
                let itemRaw = await contract.Items(token)
                let priceFinal = (Number(itemRaw[4]) / 10 ** 18).toString()
                console.log(priceFinal)
                let seller = itemRaw[5].toString()

                let meta = {
                      name: name,
                      img: image,
                      price: priceFinal,
                      tokenId: token,
                      wallet: ropstenNFTcontract,
                      seller, 
                      desc
                    }
                    console.log(meta)
                    itemArray.push(meta)
            }
    }})
    await new Promise(r => setTimeout(r, 9000));
    console.log("itens: " + itemArray)
    ropstenNFTcontractsell(itemArray)
  }

  const responsive = {
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 1,
      slidesToSlide: 1 
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 2,
      slidesToSlide: 2
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 1,
      slidesToSlide: 1 
    }
  };

  return (
    <div>
      <div>
        <Container xl style={{ backgroundImage: 'linear-gradient(to top, #020202, #050505, #080808, #0b0b0b, #0e0e0e, #16141a, #1e1724, #291a2d, #451a3a, #64133c, #820334, #9b0022)' }}>
          <Container xs css={{marginBottom:'$3'}}>
          <Text css={{ marginLeft: '$40', justifyContent:'' }} h2>Trix Battle Tactics</Text>
          <Carousel swipeable={false}
            draggable={false}
            showDots={true}
            responsive={responsive}
            ssr={true}
            infinite={true}
            autoPlay={true}
            autoPlaySpeed={6000}
            keyBoardControl={true}
            customTransition="all .5"
            transitionDuration={800}
            containerClass="carousel-container"
            removeArrowOnDeviceType={["tablet", "mobile"]}
            dotListClass="custom-dot-list-style"
            itemClass="carousel-item-padding-60-px">
            {
              hhlist.map((nft, i) => (
                  <div>
                    <Card.Image css={{marginLeft:'$15', maxWidth:'450px'}} src={nft.img} key={i} />
                  </div>
              ))
            }
          </Carousel>
          </Container>
        </Container>
      </div>
      <Container sm>
        <Row css={{ marginTop: '$3', marginBottom: '$3' }}>
          <Text h3>Latest NFT's</Text>
        </Row>
        <Grid.Container gap={1} justify="flex-start">
          {
            hhlist.slice(0, 9).map((nft, id) => {
                async function buylistNft() {
                  const web3Modal = new Web3Modal()
                  const connection = await web3Modal.connect()
                  const provider = new ethers.providers.Web3Provider(connection)
                  const signer = provider.getSigner()
                  console.log("Funcionando " + signer)
                  const contract = new ethers.Contract(ropstenNFTcontract, NFT, signer)
                  const transaction = await contract.buyItem(nft.tokenId, { value: ethers.utils.parseEther(nft.price) })
                  //await transaction.wait()
                  //router.push('/portal')
                }
                return (
                  <Grid xs={3}>
                    <Card style={{ boxShadow: '1px 1px 10px #ffffff' }} variant="bordered" key={id}>
                      <Text style={{
                        color: 'white',
                        fontWeight: 'bold',
                        fontFamily: 'SF Pro Display',
                        fontWeight: '200',
                        fontSize: '20px',
                        marginLeft: '3px'
                      }}>{nft.name} Token-{nft.tokenId}</Text>
                      <Card.Body css={{ p: 0 }}>
                        <Card.Image 
                          style={{ maxWidth: '150px', borderRadius: '6%' }}
                          src={nft.img}
                        />
                      </Card.Body>
                      <Card.Footer css={{ justifyItems: "flex-start" }}>
                    <Row key={id}wrap="wrap" justify="space-between" align="center">
                      <Text wrap="wrap">{nft.desc}</Text>
                      <Text  style={{ fontSize: '30px' }}>{nft.price} MATIC </Text>
                      <Button color="gradient" style={{ fontSize: '20px' }} onPress={() => handleConfetti(buylistNft(nft))}>Buy</Button>
                    </Row>
                  </Card.Footer>
                </Card>
                  </Grid>
                )
              })
            }
        </Grid.Container>
      </Container>
      <Spacer></Spacer>
    </div>
  )
}