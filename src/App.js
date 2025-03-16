import React, { useState, useEffect, useRef } from 'react';
import './App.css';
import videoData from './demo.json';

function Navbar() {
  return (
    <nav className="navbar" role="navigation" aria-label="main navigation">
      <div className="navbar-brand">
        <a role="button" className="navbar-burger" aria-label="menu" aria-expanded="false">
          <span aria-hidden="true"></span>
          <span aria-hidden="true"></span>
          <span aria-hidden="true"></span>
        </a>
      </div>
      <div className="navbar-menu">
        <div className="navbar-start" style={{ flexGrow: 1, justifyContent: 'center' }}>
          <a className="navbar-item" href="https://www.mackenziemathislab.org">
            <span className="icon">
              <i className="fas fa-home"></i>
            </span>
          </a>
          <div className="navbar-item has-dropdown is-hoverable">
            <a className="navbar-link">Our Related Research</a>
            <div className="navbar-dropdown">
              <a className="navbar-item" href="https://github.com/AdaptiveMotorControlLab/AmadeusGPT">
                AmadeusGPT
              </a>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}

function Hero() {
  return (
    <section className="hero">
      <div className="hero-body">
        <div className="container is-max-desktop">
          <div className="columns is-centered">
            <div className="column has-text-centered">
              <h1 className="title is-1 publication-title">
                LLaVAction: evaluating and training multi-modal large language models for action recognition
              </h1>
              <div className="is-size-5 publication-authors">
                <span className="author-block">
                  <a href="https://yeshaokai.github.io/">Shaokai Ye*</a><sup>1</sup>
                </span>
                <span className="author-block">
                  <a href="https://people.epfl.ch/haozhe.qi?lang=en">Haozhe Qi*</a><sup>1</sup>
                </span>
                <span className="author-block">
                  <a href="https://mathislab.org/">Alexander Mathis**</a><sup>1</sup>
                </span>
                <span className="author-block">
                  <a href="https://www.mackenziemathislab.org/">Mackenzie Mathis**</a><sup>1</sup>
                </span>
              </div>
              <div className="is-size-5 publication-authors">
                <span className="author-block"><sup>1</sup>EPFL</span>
              </div>
              <div className="publication-links">
                <span className="link-block">
                  <a href="https://arxiv.org/pdf/2011.12948" className="external-link button is-normal is-rounded is-dark">
                    <span className="icon">
                      <i className="fas fa-file-pdf"></i>
                    </span>
                    <span>Paper</span>
                  </a>
                </span>
                <span className="link-block">
                  <a href="https://github.com/AdaptiveMotorControlLab/LLaVAction" className="external-link button is-normal is-rounded is-dark">
                    <span className="icon">
                      <i className="fab fa-github"></i>
                    </span>
                    <span>Code</span>
                  </a>
                </span>
                <span className="link-block">
                  <a href="https://huggingface.co/datasets/lmms-lab/LLaVA-Video-178K" className="external-link button is-normal is-rounded is-dark">
                    <span className="icon">
                      <i className="far fa-images"></i>
                    </span>
                    <span>Data</span>
                  </a>
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function Abstract() {
  return (
    <section className="section">
      <div className="container is-max-desktop">
        <div className="columns is-centered has-text-centered">
          <div className="column is-four-fifths">
            <h2 className="title is-3">Abstract</h2>
            <div className="content has-text-justified">             
              <p>
              Understanding human behavior requires measuring behavioral actions. Due to its complexity, 
            behavior is best mapped onto a rich, semantic structure such as language. The recent development
            of multi-modal large language models (MLLMs) is a promising candidate for a wide range of action
            understanding tasks. In this work, we focus on evaluating and then improving MLLMs to perform action
            recognition. We reformulate EPIC-KITCHENS-100, one of the largest and most challenging egocentric 
            action datasets, to the form of video multiple question answering (EPIC-KITCHENS-100-MQA). We show
            that when we sample difficult incorrect answers as distractors, leading MLLMs struggle to recognize
            the correct actions. We propose a series of methods that greatly improve the MLLMs' ability to perform
            action recognition, achieving state-of-the-art on both the EPIC-KITCHENS-100 Challenge, as well as
            outperforming GPT-4o by 21 points in accuracy on EPIC-KITCHENS-100-MQA. Lastly, we show improvements
            on other action-related video benchmarks such as VideoMME, PerceptionTest and MVBench.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function App() {
  const [currentVideoIndex, setCurrentVideoIndex] = useState(0);
  const [displayMode, setDisplayMode] = useState('multiple-choice'); // 'multiple-choice' or 'descriptive'
  const videoKeys = Object.keys(videoData);
  const currentVideo = videoData[videoKeys[currentVideoIndex]];
  
  const goToNextVideo = () => {
    setCurrentVideoIndex((prevIndex) => (prevIndex + 1) % videoKeys.length);
  };
  
  const goToPrevVideo = () => {
    setCurrentVideoIndex((prevIndex) => (prevIndex - 1 + videoKeys.length) % videoKeys.length);
  };
  
  useEffect(() => {
    // Check if all videos in demo.json have corresponding folders
    const missingVideos = videoKeys.filter(key => {
      const video = document.createElement('video');
      video.src = `${process.env.PUBLIC_URL}/videos/${key}/video.mp4`;
      return video.networkState === HTMLMediaElement.NETWORK_NO_SOURCE;
    });
    
    if (missingVideos.length > 0) {
      console.warn('Missing videos for these keys:', missingVideos);
    }
  }, []);
  
  // Add keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'ArrowLeft') goToPrevVideo();
      if (e.key === 'ArrowRight') goToNextVideo();
    };
    
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);
  
  useEffect(() => {
    // Check if icon files exist
    const iconFiles = ['llavaction.svg', 'chatgpt.png'];
    iconFiles.forEach(file => {
      const img = new Image();
      img.onload = () => console.log(`Icon loaded successfully: ${file}`);
      img.onerror = () => console.error(`Failed to load icon: ${file}`);
      img.src = `${process.env.PUBLIC_URL}/icons/${file}`;
    });
  }, []);
  
  return (
    <div className="app">
      <Navbar />
      <Hero />
      <Abstract />
      
      <section className="section" id="demo">
        <div className="container is-max-desktop">
          <div className="columns is-centered">
            <div className="column is-full-width">
              <h2 className="title is-3">Demo</h2>
              <div className="content">
                <div className="video-container">
                  <div className="video-navigation">
                    <button 
                      className="nav-arrow nav-arrow-left" 
                      onClick={goToPrevVideo}
                      aria-label="Previous video"
                    >
                      <span>&#10094;</span>
                    </button>
                    
                    <VideoPlayer videoId={videoKeys[currentVideoIndex]} />
                    
                    <button 
                      className="nav-arrow nav-arrow-right" 
                      onClick={goToNextVideo}
                      aria-label="Next video"
                    >
                      <span>&#10095;</span>
                    </button>
                  </div>
                  
                  <div className="dot-indicators">
                    {videoKeys.map((key, index) => (
                      <button
                        key={key}
                        className={`dot ${index === currentVideoIndex ? 'active' : ''}`}
                        onClick={() => setCurrentVideoIndex(index)}
                        aria-label={`Go to video ${index + 1}`}
                      />
                    ))}
                  </div>
                </div>
                
                <div className="data-container">
                  <div className="display-mode-toggle">
                    <button 
                      className={displayMode === 'multiple-choice' ? 'active' : ''}
                      onClick={() => setDisplayMode('multiple-choice')}
                    >
                      Multiple Choice
                    </button>
                    <button 
                      className={displayMode === 'descriptive' ? 'active' : ''}
                      onClick={() => setDisplayMode('descriptive')}
                    >
                      Descriptive
                    </button>
                  </div>
                  
                  <DataDisplay 
                    data={currentVideo} 
                    displayMode={displayMode} 
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="section" id="BibTeX">
        <div className="container is-max-desktop content">
          <h2 className="title">BibTeX</h2>
          <pre><code>{`@article{YeQi2025llavaction,
  title={LLaVAction: evaluating and training multi-modal large language models for action recognition},
  author={Ye, Shaokai and Qi, Haozhe and Mathis, Alexander and Mathis, Mackenzie W.},
  journal={arXiv preprint},
  year={2025}
}`}</code></pre>
        </div>
      </section>
    </div>
  );
}

function VideoPlayer({ videoId }) {
  const videoSrc = `${process.env.PUBLIC_URL}/videos/${videoId}/video.mp4`;
  const videoRef = useRef(null);
  const [playbackRate, setPlaybackRate] = useState(0.5); // Default to half speed
  
  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.playbackRate = playbackRate;
    }
  }, [videoId, playbackRate]);
  
  return (
    <div className="video-player">
      <video 
        ref={videoRef}
        key={videoId} 
        controls 
        autoPlay 
        loop
      >
        <source src={videoSrc} type="video/mp4" />
        Your browser does not support the video tag.
      </video>
      <p className="video-id">{videoId}</p>
      <div className="playback-controls">
        <button onClick={() => setPlaybackRate(rate => Math.max(0.1, rate - 0.1))}>Slower</button>
        <span>{playbackRate.toFixed(1)}x</span>
        <button onClick={() => setPlaybackRate(rate => Math.min(2, rate + 0.1))}>Faster</button>
      </div>
    </div>
  );
}

function DataDisplay({ data, displayMode }) {
  return (
    <div className="data-display">
      <div className="ground-truth">
        <h3>Ground Truth Action:</h3>
        <p>{data.gt}</p>
      </div>
      
      {displayMode === 'multiple-choice' ? (
        <div className="multiple-choice">
          <div className="model-legend">
            <div className="model-item">
              <img 
                src={`${process.env.PUBLIC_URL}/icons/llavaction.svg`} 
                alt="LLaVAction" 
                className="model-icon llavaction-icon"
              />
              <span>LLaVAction</span>
            </div>
            <div className="model-item">
              <img 
                src={`${process.env.PUBLIC_URL}/icons/chatgpt.png`} 
                alt="ChatGPT" 
                className="model-icon"
              />
              <span>ChatGPT</span>
            </div>
          </div>
          
          <h3>Action Options:</h3>
          <ul>
            {data.llavaction_options.map((option, index) => {
              // Determine which models predicted this option
              const isLlavPrediction = option === data.llavaction_pred;
              const isChatGptPrediction = option === data.tim_chatgpt_pred;
              
              return (
                <li 
                  key={index}
                  className={`
                    ${isLlavPrediction ? 'llav-highlighted' : ''}
                    ${isChatGptPrediction ? 'chatgpt-highlighted' : ''}
                  `}
                >
                  <span>{option}</span>
                  
                  <div className="prediction-icons">
                    {isLlavPrediction && (
                      <img 
                        src={`${process.env.PUBLIC_URL}/icons/llavaction.svg`} 
                        alt="LLaVAction prediction" 
                        className="prediction-icon llavaction-icon"
                      />
                    )}
                    
                    {isChatGptPrediction && (
                      <img 
                        src={`${process.env.PUBLIC_URL}/icons/chatgpt.png`} 
                        alt="ChatGPT prediction" 
                        className="prediction-icon"
                      />
                    )}
                  </div>
                </li>
              );
            })}
          </ul>
        </div>
      ) : (
        <div className="descriptive">
          <div className="open-ended">
            <h3>Objects Visible:</h3>
            <p>{data.open_ended}</p>
          </div>
          <div className="caption">
            <h3>Action Description:</h3>
            <p>{data.caption}</p>
          </div>
        </div>
      )}
    </div>
  );
}

export default App; 