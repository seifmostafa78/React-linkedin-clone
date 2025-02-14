import { useState } from "react"
import { connect } from "react-redux"
import styled from "styled-components"
import ReactPlayer from "react-player"
import { postArticleApi } from "../redux/actions/index"
import { Timestamp } from "firebase/firestore"

const PostModal = (props) => {
  const [editorText, setEditorText] = useState("")
  const [assetMedia, setAssetMedia] = useState("")
  const [shareImage, setShareImage] = useState("")
  const [videoLink, setVideoLink] = useState("")

  const handleChange = (e) => {
    const file = e.target.files[0];

    if(file === "" || file === undefined){
      alert(`not an image , the file is a ${typeof image}`);
      return;
    }else{
      const imageUrl = URL.createObjectURL(file)
      setShareImage(imageUrl)
    }
  }

  const switchAssetArea  = (area) => {
    setShareImage("")
    setVideoLink("")
    setAssetMedia(area)
  }

  const handlePostArticle = (e) => {
    e.preventDefault();

    if(e.target !== e.currentTarget){
      return;
    }

    const payload = {
      description: editorText,
      image: shareImage,
      video: videoLink,
      user: props.user,
      timestamp: Timestamp.now(),
    }

    props.postArticle(payload)
    reset(e);
  }

  const reset = (e) => {
    setEditorText("")
    setAssetMedia("")
    setShareImage("")
    setVideoLink("")
    props.handleClick(e)
  }

  return (
    <>
        {props.showModel && (
            <Container>
                <Content>
                    <Header>
                        <h2>Create a post</h2>
                        <button onClick={(e) => reset(e)}>
                            <img src="/images/close-icon.svg" alt="" />
                        </button>
                    </Header>
                    <ShareContent>
                        <UserInfo>
                           {props.user && props.user.photoURL? (
                            <img src={props.user.photoURL} alt=""/>
                            ) : (
                            <img src="/images/user.svg" alt="" />
                            )}
                            <span>{props.user.displayName}</span>
                        </UserInfo>
                        <Editor>
                            <textarea
                            value={editorText}
                            onChange={(e) => setEditorText(e.target.value)}
                            placeholder="What do you want to talk about?"
                            autoFocus={true} 
                            />

                            {assetMedia === "image"? (
                                <UploadImage>
                                    <input
                                    type="file" 
                                    name="image" 
                                    id="file"
                                    style={{display: "none"}}
                                    onChange={handleChange}
                                    />
                                    <p>
                                        <label
                                        style={{
                                          cursor: "pointer",
                                          display: "block",
                                          marginBottom: "15px",
                                          color: "#0a66c2",
                                          textDecoration: "underline",
                                        }} 
                                        htmlFor="file"
                                        >
                                            Select an image to share
                                        </label>
                                    </p>
                                    {shareImage && (
                                        <img src={shareImage} alt=""/>
                                    )}
                                </UploadImage>
                            ) : assetMedia === "media" && (
                                <>
                                    <input
                                    type="text" 
                                    value={videoLink}
                                    onChange={(e) => setVideoLink(e.target.value)}
                                    placeholder="Please input a video link"
                                    style={{ 
                                      width: "100%", 
                                      height: "30px",
                                      outlineColor: "#0a66c2",
                                      paddingLeft: "10px",
                                      marginBottom: "20px", 
                                    }}
                                    autoFocus={true}
                                    />
                                    {videoLink && (
                                      <ReactPlayer url={videoLink} width="100%"/>
                                    )}
                                </>
                            )}
                        </Editor>
                    </ShareContent>
                    <ShareCreation>
                        <AttachAssets>
                            <AssetButton onClick={() => switchAssetArea("image")}>
                                <img src="/images/share-image.svg" alt="" />
                            </AssetButton>
                            <AssetButton onClick={() => switchAssetArea("media")}>
                                <img src="/images/share-video.svg" alt="" />
                            </AssetButton>
                        </AttachAssets>
                        <ShareComment>
                            <AssetButton>
                                <img src="/images/share-comment.svg" alt="" />
                                Anyone
                            </AssetButton>
                        </ShareComment>
                        <PostButton
                        onClick={(e) => handlePostArticle(e)} 
                        disabled={!editorText? true : false}
                        >
                            Post
                        </PostButton>
                    </ShareCreation>
                </Content>
            </Container>
        )}
    </>
  )
}

const mapStateToProps = (state) => {
    return {
      user: state.userState.user,
    }
}

const mapDispatchToProps = (dispatch) => {
  return {
    postArticle: (payload) => dispatch(postArticleApi(payload))
  }
}

const Container = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 9999;
  color: black;
  background-color: rgba(0, 0, 0, 0.8);
  animation: fadeIn 0.3s;
`;

const Content = styled.div`
  width: 100%;
  max-width: 552px;
  background-color: white;
  max-height: 90%;
  overflow: initial;
  border-radius: 5px;
  position: relative;
  display: flex;
  flex-direction: column;
  top: 32px;
  margin: 0 auto;

  @media (max-width: 768px) {
    width: 80%;
    max-height: 75%;
    top: 15%;
  }

  button {
    border: none;
    display: flex;
    justify-content: center;
    align-items: center;
    transition: background 0.3s ease;
  }
`;
const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 16px 20px;
  border-bottom: 1px solid rgba(0, 0, 0, 0.15);

  h2 {
    line-height: 1.5;
    font-weight: 400;
    font-size: 18px;
    color: rgba(0, 0, 0, 0.6);
  }

  button {
    height: 40px;
    width: 40px;
    min-width: auto;
    color: rgba(0, 0, 0, 0.15);
    background: none;
    border-radius: 50%;
    cursor: pointer;
    &:hover {
      background-color: rgba(0, 0, 0, 0.08);
    }
  }

  svg,
  img {
    pointer-events: none;
  }
`;

const ShareContent = styled.div`
  display: flex;
  flex-direction: column;
  flex-grow: 1;
  overflow-y: auto;
  vertical-align: baseline;
  background: transparent;
  padding: 8px 12px;
`;

const UserInfo = styled.div`
  display: flex;
  align-items: center;
  padding: 12px 0;

  sv,
  img {
    width: 48px;
    height: 48px;
    background-clip: content-box;
    border: 2px solid transparent;
    border-radius: 50%;
  }

  span {
    font-weight: 600;
    line-height: 1.5;
    font-size: 16px;
    margin-left: 5px;
  }
`;

const ShareCreation = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 12px 24px 16px 16px;
  height: 30px;
`;

const AssetButton = styled.div`
  height: 40px;
  min-width: auto;
  display: flex;
  align-items: center;
  justify-content: center;
  color: rgba(0, 0, 0, 0.6);
  font-weight: 500;
  font-size: 14px;
  background: none;
  border-radius: 50%;
  cursor: pointer;
  &:hover {
    background-color: rgba(0, 0, 0, 0.08);
  }
`;

const AttachAssets = styled.div`
  display: flex;
  align-items: center;
  padding-right: 8px;
  ${AssetButton} {
    width: 40px;
  }
`;

const ShareComment = styled.div`
  padding-left: 8px;
  margin-right: auto;
  border-left: 1px solid rgba(0, 0, 0, 0.15);
  display: grid;
  place-items: center;

  ${AssetButton} {
    svg,
    img {
      margin-right: 5px;
    }
    padding: 10px;
    height: 30px;
    border-radius: 30px;
    &:hover {
      background-color: rgba(0, 0, 0, 0.08);
    }
  }
`;

const PostButton  = styled.button`
  min-width: 60px;
  padding: 8px 16px;
  background: ${(props) => (props.disabled ? "rgb(235,235,235)" : "#0a66c2")};
  color: ${(props) => (props.disabled ? "rgb(0,0,0,0.25)" : "white")};
  cursor: ${(props) => (props.disabled ? "not-allowed" : "pointer")};
  font-weight: 500;
  font-size: 16px;
  border-radius: 30px;
  &:hover {
    background: ${(props) => (props.disabled ? "" : "#004182")};
  }
`;

const Editor  = styled.button`
  display: flex;
  flex-direction: column;
  padding: 12px 0;
  background-color: #fff; 
  display: flex;
  textarea {
  width: 100%;
  min-height: 100px;
  resize: none;
  font-size: 16px;
  font-weight: 400;
  outline: none;
  border: none;
  line-height: 1.5;
  }
`;


const UploadImage = styled.div`
  text-align: center;
  img {
    width: 100%;
  }
`;

export default connect(mapStateToProps, mapDispatchToProps)(PostModal)
