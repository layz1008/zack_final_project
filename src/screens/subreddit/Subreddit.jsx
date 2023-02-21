import {React, useEffect, useState} from "react";
import "./subreddit.css";
import Post from "../../components/posts/Post";
import PostModal from "../../components/posts/PostModal";
import { Link, useParams, useLocation, Route } from "react-router-dom";
import { getPosts, getPost } from "../../services/posts";
import { getComments } from "../../services/comments";
import { getSubs, getSub } from "../../services/subs";
import CreatePost from "../createPost/CreatePost";

export default function Subreddit({}) {
  const [posts, setPosts] = useState([]);
  const [modalPost, setModalPost] = useState({});
  const [displayModal, setDisplayModal] = useState(false);
  const [comments, setComments] = useState([]);
  const [subTitle, setSubTitle] = useState([]);
  const [subDescription, setSubDescription] = useState([]);
  const [creator, setCreator] = useState([]);
  const [join, setJoin] = useState([])
  const [show, setShow] = useState(false)
  const [subID,setSubID] = useState(0)
  const [refresh,setRefresh] = useState(false)
  const [joinn,setJoinn] = useState(new Audio('https://us-tuna-sounds-files.voicemod.net/36b12885-18d0-44ed-97ec-ff3e0956f211-1662757013368.mp3'
  )) 
  const [postHelp,setPostHelp] = useState(new Audio('https://www.myinstants.com/media/sounds/ohyes.mp3'
  ))
  let {id} = useParams();
  const subPath = useLocation();
  
  function inSub(){
    
  }

  function openCreateModal(){
    postHelp.play()
    return setShow(true)
    console.log(show)
  }
  function closeCreateModal(){
    return setShow(false)
    console.log(show)
  }
  
  
  async function joinSubreddit(){
    const findFollowers = await getSub(id)
    // console.log(findFollowers.followers)
    if('userID is included in follower list'){
      return <button id = "join-button">Joined</button>
      // update followers array(subs) to include useID
    } else {
      // update followers array(subs) to remove userID
      return <button id = "join-button">Join</button>}
    }
  joinSubreddit()

  async function fetchSub(){
    
    const res = await getSub(id)
    const ids = res
    setSubTitle(ids.title)
    setCreator(ids.creator)
    setSubDescription(ids.description)
    setSubID(ids.id)
    // console.log(ids)
  }
  

  useEffect(() => {
    fetchPosts();
    fetchSub();
  }, [id]);

  async function fetchPosts() {
    const allPosts = await getPosts();
    const subID = allPosts[id].sub
    // console.log(`sub id: ${subID}`)
    // console.log(`post subid: ${allPosts[id].sub}`)
    // console.log(`posts: ${allPosts}`)

    setPosts(allPosts.filter(post => {
      // console.log(post)
      // console.log(id)
      return post.sub == id
    }));


    // console.log(posts)
  //   fetchPost()
  // async function fetchPosts() {
  //   const allPosts = await getPosts();
  //   setPosts(allPosts.filter(post => id === post.sub.id));
  // }
}

  useEffect(() => {
    const fetchComment = async () => {
      const response = await getComments();
      setComments(response);
    };

    fetchComment();
  }, [refresh]); 

  function joinIt() {
    joinn.play();
  }
  

  return (
      <div className="home-page-main-container">
      
      {/* request the "Subs" title, link,  followers, comments, upVotes and downVotes from the subs Library using the subs id
      comments tab will display a number of comment total instances.
      upvotes/downvotes will be a function of "upVotes - downVotes" situated in between their respective buttons.
      followers will show a total number of users following the current sub.  by gettting the length of the table array for folllower id's in the subs table we get a total number of followers*/}
      <div id ='subredditHeader'>
        <img id ='user-avatar' src="https://icon-library.com/images/generic-user-icon/generic-user-icon-10.jpg" alt='user avatar'></img>
        <div id = 'title-subLink-join'>
          <h1 id ='sub-title'>{subTitle}</h1>
          <Link to ='/subs/:id' id = 'sub-link'>r/{subTitle}</Link>
        </div>
        {/* onClick, add subredditId to user list of subreddit id's. if it exists within the user library then button should read "Joined" if clicked in this state button should remove subreddit id from the user library and read "Join".*/}
        <button id = "join-button" onClick={joinIt}>Join</button>
        {/* requiest the subreddit description from the subs table */}
        <p id ='subreddit-description'>{subDescription}</p>
        {/* contains functions for filtering for: chronological order, highest upvotes, and highest upvotes in a 24h time frame. picking any of the list items will change the state of the page.*/}
        
        
        {/* <button onClick={openCreateModal}>newPost</button> */}

        {show == true ? 
          <div className="create-buttons">
          <CreatePost subID={subID}/>
            <button className="new-post-button" id="close-post" onClick={closeCreateModal}>Close</button>
          </div>
          :<button className="new-post-button" onClick={openCreateModal}>New Post</button>}

      </div>
    {/* if join-subreddit == Join clicked. check if user object contains subreddit-ID then change button to Joined if not display join */}
    <div className='sub-post'>
    {posts.map((post) => (
          <Post
            key={post.id}
            setDisplayModal={setDisplayModal}
            setModalPost={setModalPost}
            post={post}
            comments={comments}
          />
        ))}

          <PostModal
          modalPost={modalPost}
          displayModal={displayModal}
          setDisplayModal={setDisplayModal}
          comments={comments}
          refresh={refresh}
          setRefresh={setRefresh}
          />
    </div>
    </div>
    
  );
  
}
