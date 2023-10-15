import { useEffect, useState } from "react";

const memeObj = {
  "bottomText": "",
  "topText": "",
  "randomImage": "http://i.imgflip.com/1bij.jpg"
}

function Meme() {

  const [ meme, setMeme ] = useState(memeObj);
  const [ allMemes, setAllMemes ] = useState([]);
  const [formData, setFormData] = useState({
    topText: "",
    bottomText: ""
  });

  const getMemeImage = () => {
    const memeArray = allMemes;
    const randomNum = Math.floor(Math.random() * memeArray.length);
    const { url } = memeArray[randomNum];
    setMeme(prevMeme => ({
      ...prevMeme,
      randomImage: url
    }));
  }

  useEffect(() => {
    fetch("https://api.imgflip.com/get_memes")
      .then(response => response.json())
      .then(data => setAllMemes(data.data.memes));
  }, []);


  const handleChange = (e) => {
    const { name, value} = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }))
  }

  return (
    <main>
      <div className="form">
        <input 
            type="text"
            placeholder="Top text"
            className="form--input"
            name="topText"
            onChange={handleChange}
            value={formData.topText}
        />
        <input 
            type="text"
            placeholder="Bottom text"
            className="form--input"
            name="bottomText"
            onChange={handleChange}
            value={formData.bottomText}
        />
      <button 
          className="form--button"
          onClick={getMemeImage}
      >
          Get a new meme image 🖼
      </button>
      </div>
      <div className="meme">
          <img src={meme.randomImage} className="meme--image" />
          <h2 className="meme--text top">{formData.topText}</h2>
          <h2 className="meme--text bottom">{formData.bottomText}</h2>
      </div>
    </main>
  )
}

export default Meme;