import { Box, Card, TextField, Button, Typography, Tab } from "@mui/material";

import { TabPanel, TabContext, TabList } from "@mui/lab";

import {
  useWeb3Modal,
  useWeb3ModalAccount,
  useWeb3ModalProvider,
} from "@web3modal/ethers/react";
import { toast } from "react-toastify";

import { UilExposureIncrease, UilUpload } from "@iconscout/react-unicons";
import { useContext, useState, useEffect } from "react";
import {
  checkUserConnected,
  checkUserIsOwner,
} from "../../../../helper/transactions";

import NFTContext from "../../../../context/NFTContext";
import CreateTokenShow from "./CreateTokenShow";
import SucceedModal from "./CreateTokenModal";
import axios from "axios";
import lighthouse from "@lighthouse-web3/sdk";
import { BrowserProvider } from "ethers";

const CreateToken = () => {
  const [value, setValue] = useState("1");
  const [description, setDescription] = useState("");
  const [name, setName] = useState("");

  // Defining a function called handleChange that takes in an event and a newValue as parameters
  const handleChange = (event, newValue) => {
    // Updating the value state variable with the newValue parameter
    setValue(newValue);
    setName("");
    setDescription("");
    setImage(null);
    setHaveImg(false);
  };
  const [openModal, setOpenModal] = useState(false);
  const [signer, setSigner] = useState("");
  const [btn, setBtn] = useState(true);
  const [info, setInfo] = useState({
    URl: "",
    ID: "",
  });
  const { isConnected, address } = useWeb3ModalAccount();
  const { open } = useWeb3Modal();
  const { NFTContract, data } = useContext(NFTContext);
  const [image, setImage] = useState(null);
  const [HaveImg, setHaveImg] = useState(false);
  const { walletProvider } = useWeb3ModalProvider();

  useEffect(() => {
    const getSigner = async () => {
      const ethersProvider = new BrowserProvider(walletProvider);
      const signer = await ethersProvider.getSigner();
      setSigner(signer);
      // console.log(signer);
    };
    getSigner();
  }, [isConnected]);
  const handleImageChange = (event) => {
    if (event.target.files && event.target.files[0]) {
      const img = event.target.files[0];

      if (
        img.type === "image/apng" ||
        img.type === "image/bmp" ||
        img.type === "image/gif" ||
        img.type === "image/jpg" ||
        img.type === "image/png" ||
        img.type === "image/webp" ||
        img.type === "image/svg" ||
        img.type === "image/jpeg"
      ) {
        setHaveImg(true);
      } else {
        setHaveImg(false);
      }
      setImage(img);
    }
  };
  const getApiKey = async () => {
    const verificationMessage = (
      await axios.get(
        `https://api.lighthouse.storage/api/auth/get_message?publicKey=${address}`
      )
    ).data;
    const signedMessage = await signer.signMessage(verificationMessage);

    const response = await lighthouse.getApiKey(address, signedMessage);
    return response.data.apiKey;
  };
  const onclick = async () => {
    checkUserConnected(isConnected, open);
    checkUserIsOwner(data.owner);

    if (value === "1") {
      if (name === "" || description === "") {
        throw toast.error("name or description is required");
      }
      const nft = JSON.stringify({
        name: name,
        description: description,
      });

      setBtn(false);
      try {
        const apiKey = await getApiKey();

        const metadata = await toast.promise(
          lighthouse.uploadText(nft, apiKey, name),
          {
            pending: "saving metadata on ipfs",
            success: "saved on metadata successfully",
            error: "Error",
          }
        );
        setName("");
        setDescription("");
        NFTContract.once("newNFTMinted", (newItemId) => {
          setInfo({
            ID: newItemId,
            URl: `https://gateway.lighthouse.storage/ipfs/${metadata.data.Hash}`,
          });
        });
        const tx = await NFTContract.createToken(
          `https://gateway.lighthouse.storage/ipfs/${metadata.data.Hash}`
        );
        await toast.promise(tx.wait(), {
          pending: "pending transaction",
          error: "ERROR",
          success: "transaction successfully done!",
        });
        setOpenModal(true);
      } catch (error) {
        toast.error(error.message);
        console.log(error);
        setBtn(true);
      }
    } else if (value === "2") {
      if (image === null) {
        throw toast.error("file Not Upload");
      }
      const img = URL.createObjectURL(image);

      setImage(null);
      setBtn(false);
      try {
        const apiKey = await getApiKey();

        const metadata = await toast.promise(lighthouse.upload(img, apiKey), {
          pending: "saving metadata on ipfs",
          success: "saved on metadata successfully",
          error: "Error",
        });
        setName("");
        setDescription("");
        NFTContract.once("newNFTMinted", (newItemId) => {
          setInfo({
            ID: newItemId,
            URl: `https://gateway.lighthouse.storage/ipfs/${metadata.data.Hash}`,
          });
        });
        const tx = await NFTContract.createToken(
          `https://gateway.lighthouse.storage/ipfs/${metadata.data.Hash}`
        );
        await toast.promise(tx.wait(), {
          pending: "pending transaction",
          error: "ERROR",
          success: "transaction successfully done!",
        });
        setOpenModal(true);
      } catch (error) {
        toast.error(error.message);
        console.log(error);
        setBtn(true);
      }
    }
    setBtn(true);
  };
  return (
    <Card
      sx={{
        display: "flex",
        width: "98%",
        ml: "1%",
        justifyContent: "center",
        borderRadius: 5,
        mb: 5,
      }}
    >
      <CreateTokenShow
        file={
          image === null
            ? ""
            : HaveImg === true
            ? URL.createObjectURL(image)
            : image.name
        }
        HaveImg={HaveImg}
      />
      <Box width={"52%"}>
        <Box
          sx={{
            width: "70%",
            mt: "15%",
            ml: "15%",
            lineHeight: 2,
            mb: "10%",
          }}
          textAlign={"center"}
        >
          {" "}
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              mt: 5,
              alignItems: "center",
            }}
          >
            <TabContext value={value}>
              <Box>
                <TabList onChange={handleChange} centered>
                  <Tab label="Text" value="1" />
                  <Tab label="image" value="2" />
                </TabList>
              </Box>

              <TabPanel sx={{ width: 400 }} value="1">
                <UilExposureIncrease size="100" />
                <Typography variant="h4" mt={2}>
                  Create Token by Text
                </Typography>
                <Box>
                  <TextField
                    name="name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    fullWidth
                    id="name"
                    label="name"
                    sx={{ mt: 2 }}
                  />
                  <TextField
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    name="description"
                    multiline
                    id="description"
                    label="description"
                    sx={{ mt: 2 }}
                    fullWidth
                  />

                  <Button
                    onClick={() => onclick()}
                    disabled={!btn}
                    variant="contained"
                    sx={{
                      mr: 5,
                      ml: "8.5%",
                      mt: 2,
                      width: "83%",
                      fontSize: 24,
                    }}
                  >
                    Create Token
                  </Button>
                </Box>
              </TabPanel>
              <TabPanel sx={{ width: 400 }} value="2">
                <UilExposureIncrease size="100" />
                <Typography variant="h4" mt={2}>
                  Create Token by image
                </Typography>
                <Box component="form">
                  <Button
                    color="secondary"
                    component="label"
                    role={undefined}
                    variant="contained"
                    tabIndex={-1}
                    startIcon={<UilUpload />}
                    sx={{ fontSize: 20, width: "40%", mt: 4 }}
                  >
                    Upload
                    <TextField
                      required
                      name="image"
                      onChange={handleImageChange}
                      id="image"
                      sx={{
                        clip: "rect(0 0 0 0)",
                        clipPath: "inset(50%)",
                        height: 1,
                        overflow: "hidden",
                        position: "absolute",
                        bottom: 0,
                        left: 0,
                        whiteSpace: "nowrap",
                        width: 1,
                      }}
                      inputProps={{
                        accept: "image/png, image/jpeg , image/gif",
                      }}
                      type="file"
                    />
                  </Button>
                  <Button
                    disabled={!btn}
                    onClick={() => onclick()}
                    variant="contained"
                    sx={{
                      mr: 5,
                      ml: "8.5%",
                      mt: 2,
                      width: "83%",
                      fontSize: 24,
                    }}
                  >
                    Create Token
                  </Button>
                </Box>
              </TabPanel>
            </TabContext>
          </Box>
        </Box>
        <SucceedModal
          onChange={(newOpen) => setOpenModal(newOpen)}
          open={openModal}
          TokenID={info.ID.toString()}
          IPFSURl={info.URl}
        />
      </Box>
    </Card>
  );
};
export default CreateToken;
