import React, { useState, useEffect } from 'react';

const BirthdayInvitationCard = () => {
  const [flipped, setFlipped] = useState(false);
  const [senderMode, setSenderMode] = useState(true);
  const [recipientName, setRecipientName] = useState('');
  const [generatedLink, setGeneratedLink] = useState('');
  const [showCopied, setShowCopied] = useState(false);
  const [windowWidth, setWindowWidth] = useState(typeof window !== 'undefined' ? window.innerWidth : 0);
  
  useEffect(() => {
    // Handle window resize
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };
    
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);
  
  useEffect(() => {
    // Check if this is a recipient view by looking at URL params
    const queryParams = new URLSearchParams(window.location.search);
    const name = queryParams.get('to');
    
    if (name) {
      setRecipientName(decodeURIComponent(name));
      setSenderMode(false);
      // Auto-flip after a short delay for recipients
      setTimeout(() => setFlipped(true), 2000);
    }
  }, []);

  const generateLink = () => {
    if (!recipientName.trim()) return;
    
    // Create a URL with the recipient's name as a parameter
    const baseUrl = window.location.href.split('?')[0];
    const newLink = `${baseUrl}?to=${encodeURIComponent(recipientName)}`;
    setGeneratedLink(newLink);
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(generatedLink);
    setShowCopied(true);
    setTimeout(() => setShowCopied(false), 2000);
  };

  // Animation keyframes
  const pulseAnimation = `
    @keyframes pulse {
      0% { opacity: 0.6; }
      50% { opacity: 1; }
      100% { opacity: 0.6; }
    }
  `;
  
  const pingAnimation = `
    @keyframes ping {
      0% { transform: scale(1); opacity: 1; }
      75%, 100% { transform: scale(2); opacity: 0; }
    }
  `;
  
  const floatingAnimation = `
    @keyframes floating {
      0% { transform: translateY(0px); }
      50% { transform: translateY(-10px); }
      100% { transform: translateY(0px); }
    }
  `;
  
  const gradientAnimation = `
    @keyframes gradientShift {
      0% { background-position: 0% 50%; }
      50% { background-position: 100% 50%; }
      100% { background-position: 0% 50%; }
    }
  `;
  
  const backgroundBubblesAnimation = `
    @keyframes bubbleRise {
      0% { 
        transform: translateY(100%) translateX(0) scale(0.5); 
        opacity: 0; 
      }
      50% { 
        opacity: 0.8; 
      }
      100% { 
        transform: translateY(-100vh) translateX(20px) scale(1.2); 
        opacity: 0; 
      }
    }
  `;

  // Responsive adjustments
  const containerWidth = windowWidth < 768 ? '95%' : '100%';
  const cardHeight = windowWidth < 480 ? '220px' : '250px';
  const fontSize = windowWidth < 480 ? '90%' : '100%';
  const cardPadding = windowWidth < 480 ? '16px' : '24px';

  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      width: '100%',
      minHeight: '100vh',
      padding: '20px',
      boxSizing: 'border-box',
      background: 'linear-gradient(135deg, #8A2BE2, #FF69B4, #FF1493)',
      backgroundSize: '400% 400%',
      animation: 'gradientShift 15s ease infinite',
      position: 'relative',
      overflow: 'hidden',
      fontFamily: "'Arial', sans-serif",
      fontSize: fontSize
    }}>
      <style>
        {pulseAnimation}
        {pingAnimation}
        {floatingAnimation}
        {gradientAnimation}
        {backgroundBubblesAnimation}
      </style>
      
      {/* Animated background elements */}
      {[...Array(15)].map((_, i) => (
        <div 
          key={i}
          style={{
            position: 'absolute',
            left: `${Math.random() * 100}%`,
            bottom: '-50px',
            width: `${20 + Math.random() * 30}px`,
            height: `${20 + Math.random() * 30}px`,
            borderRadius: '50%',
            backgroundColor: 'rgba(255, 255, 255, 0.3)',
            animation: `bubbleRise ${5 + Math.random() * 10}s linear infinite`,
            animationDelay: `${Math.random() * 5}s`,
            zIndex: 0
          }}
        />
      ))}
      
      <div style={{
        background: 'rgba(255, 255, 255, 0.15)',
        backdropFilter: 'blur(10px)',
        borderRadius: '20px',
        padding: '30px',
        maxWidth: '500px',
        width: containerWidth,
        boxShadow: '0 8px 32px rgba(31, 38, 135, 0.37)',
        border: '1px solid rgba(255, 255, 255, 0.18)',
        zIndex: 1,
        marginBottom: '40px'
      }}>
        {senderMode && (
          <div style={{
            marginBottom: '32px',
            width: '100%'
          }}>
            <h2 style={{
              fontSize: windowWidth < 480 ? '18px' : '20px',
              fontWeight: 'bold',
              color: 'white',
              marginBottom: '16px',
              textAlign: 'center',
              textShadow: '0 2px 4px rgba(0,0,0,0.2)'
            }}>Create Personalized Invitation</h2>
            
            <div style={{ marginBottom: '16px' }}>
              <label htmlFor="recipientName" style={{
                display: 'block',
                fontSize: '14px',
                fontWeight: '500',
                color: 'white',
                marginBottom: '4px'
              }}>
                Recipient's Name
              </label>
              <input
                type="text"
                id="recipientName"
                style={{
                  width: '100%',
                  padding: '10px 12px',
                  border: '1px solid rgba(255,255,255,0.3)',
                  borderRadius: '8px',
                  boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
                  outline: 'none',
                  backgroundColor: 'rgba(255,255,255,0.9)',
                  boxSizing: 'border-box'
                }}
                value={recipientName}
                onChange={(e) => setRecipientName(e.target.value)}
                placeholder="Enter recipient's name"
              />
            </div>
            
            <button
              onClick={generateLink}
              style={{
                width: '100%',
                background: 'rgba(255,255,255,0.8)',
                color: '#9333EA',
                padding: '10px 0',
                borderRadius: '8px',
                border: 'none',
                boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
                cursor: 'pointer',
                transition: 'all 0.3s ease',
                fontWeight: 'bold',
                fontSize: '16px'
              }}
              onMouseOver={(e) => {
                e.currentTarget.style.transform = 'translateY(-2px)';
                e.currentTarget.style.boxShadow = '0 6px 12px rgba(0, 0, 0, 0.3)';
              }}
              onMouseOut={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = '0 4px 8px rgba(0, 0, 0, 0.2)';
              }}
            >
              Generate Invitation Link
            </button>
            
            {generatedLink && (
              <div style={{
                marginTop: '20px',
                padding: '15px',
                backgroundColor: 'rgba(255,255,255,0.9)',
                borderRadius: '8px',
                position: 'relative',
                boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)'
              }}>
                <p style={{
                  fontSize: '14px',
                  color: '#4B5563',
                  marginBottom: '8px'
                }}>Share this link with {recipientName}:</p>
                
                <div style={{ display: 'flex' }}>
                  <input 
                    type="text" 
                    readOnly 
                    value={generatedLink} 
                    style={{
                      flexGrow: 1,
                      padding: '10px',
                      border: '1px solid #D1D5DB',
                      borderRadius: '6px 0 0 6px',
                      fontSize: '14px',
                      backgroundColor: 'white',
                      boxSizing: 'border-box'
                    }}
                  />
                  <button 
                    onClick={copyToClipboard}
                    style={{
                      backgroundColor: '#9333EA',
                      padding: '0 12px',
                      borderRadius: '0 6px 6px 0',
                      border: 'none',
                      cursor: 'pointer',
                      color: 'white',
                      fontWeight: 'bold'
                    }}
                  >
                    Copy
                  </button>
                </div>
                
                {showCopied && (
                  <div style={{
                    position: 'absolute',
                    bottom: '-28px',
                    left: '0',
                    right: '0',
                    textAlign: 'center',
                    color: 'white',
                    fontSize: '14px',
                    fontWeight: 'bold',
                    textShadow: '0 1px 2px rgba(0,0,0,0.3)',
                    backgroundColor: 'rgba(5, 150, 105, 0.8)',
                    padding: '4px',
                    borderRadius: '4px',
                    boxShadow: '0 2px 4px rgba(0,0,0,0.2)'
                  }}>
                    Copied to clipboard!
                  </div>
                )}
              </div>
            )}
          </div>
        )}
        
        <div 
          style={{
            position: 'relative',
            width: '100%',
            height: cardHeight,
            cursor: 'pointer',
            transition: 'transform 0.7s',
            transformStyle: 'preserve-3d',
            perspective: '1000px',
            transform: flipped ? 'rotateY(180deg)' : 'rotateY(0deg)',
            animation: 'floating 4s ease-in-out infinite',
            boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.2)'
          }}
          onClick={() => setFlipped(!flipped)}
        >
          {/* Front of card */}
          <div style={{
            position: 'absolute',
            width: '100%',
            height: '100%',
            borderRadius: '16px',
            boxShadow: '0 10px 30px -3px rgba(0, 0, 0, 0.3)',
            background: 'linear-gradient(45deg, #9333EA, #EC4899, #EF4444, #EC4899)',
            backgroundSize: '300% 300%',
            animation: 'gradientShift 6s ease infinite',
            padding: cardPadding,
            backfaceVisibility: 'hidden',
            transition: 'all 0.7s',
            opacity: flipped ? '0' : '1',
            boxSizing: 'border-box'
          }}>
            <div style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              height: '100%',
              color: 'white',
              textAlign: 'center'
            }}>
              {recipientName && !senderMode ? (
                <div style={{ textAlign: 'center' }}>
                  <div style={{
                    fontSize: windowWidth < 480 ? '20px' : '24px',
                    fontWeight: 'bold',
                    marginBottom: '4px',
                    textShadow: '0 2px 4px rgba(0,0,0,0.2)'
                  }}>You are invited, {recipientName}!</div>
                  <div style={{
                    display: 'inline-block',
                    padding: '4px 16px',
                    backgroundColor: 'rgba(255, 255, 255, 0.2)',
                    borderRadius: '9999px',
                    marginBottom: '12px',
                    animation: 'pulse 2s infinite',
                    boxShadow: '0 4px 6px rgba(0,0,0,0.1)'
                  }}>
                    Personal Invitation
                  </div>
                </div>
              ) : (
                <div style={{
                  fontSize: windowWidth < 480 ? '16px' : '18px',
                  fontWeight: 'bold',
                  marginBottom: '8px',
                  textShadow: '0 2px 4px rgba(0,0,0,0.2)'
                }}>You're Invited!</div>
              )}
              <div style={{
                fontSize: windowWidth < 480 ? '24px' : '28px',
                fontWeight: '800',
                marginBottom: '16px',
                textShadow: '0 2px 4px rgba(0,0,0,0.3)'
              }}>BIRTHDAY CELEBRATION</div>
              <div style={{ 
                fontSize: windowWidth < 480 ? '14px' : '16px',
                textShadow: '0 1px 2px rgba(0,0,0,0.2)'
              }}>Click to see details</div>
              
              <div style={{
                position: 'absolute',
                top: '16px',
                left: '16px',
                height: windowWidth < 480 ? '32px' : '40px',
                width: windowWidth < 480 ? '32px' : '40px'
              }}>
                <div style={{
                  position: 'absolute',
                  height: windowWidth < 480 ? '24px' : '32px',
                  width: windowWidth < 480 ? '24px' : '32px',
                  backgroundColor: 'white',
                  borderRadius: '50%',
                  opacity: '0.75',
                  animation: 'ping 1.5s cubic-bezier(0, 0, 0.2, 1) infinite'
                }}></div>
                <div style={{
                  position: 'relative',
                  height: windowWidth < 480 ? '32px' : '40px',
                  width: windowWidth < 480 ? '32px' : '40px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  borderRadius: '50%',
                  backgroundColor: 'rgba(255, 255, 255, 0.4)'
                }}>
                  <span style={{ fontSize: windowWidth < 480 ? '16px' : '18px' }}>🎂</span>
                </div>
              </div>
              
              <div style={{
                position: 'absolute',
                bottom: '16px',
                right: '16px',
                height: windowWidth < 480 ? '32px' : '40px',
                width: windowWidth < 480 ? '32px' : '40px'
              }}>
                <div style={{
                  position: 'absolute',
                  height: windowWidth < 480 ? '24px' : '32px',
                  width: windowWidth < 480 ? '24px' : '32px',
                  backgroundColor: 'white',
                  borderRadius: '50%',
                  opacity: '0.75',
                  animation: 'ping 1.5s cubic-bezier(0, 0, 0.2, 1) infinite'
                }}></div>
                <div style={{
                  position: 'relative',
                  height: windowWidth < 480 ? '32px' : '40px',
                  width: windowWidth < 480 ? '32px' : '40px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  borderRadius: '50%',
                  backgroundColor: 'rgba(255, 255, 255, 0.4)'
                }}>
                  <span style={{ fontSize: windowWidth < 480 ? '16px' : '18px' }}>🎉</span>
                </div>
              </div>
            </div>
          </div>
          
          {/* Back of card */}
          <div style={{
            position: 'absolute',
            width: '100%',
            height: '100%',
            borderRadius: '16px',
            boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
            backgroundColor: 'white',
            padding: cardPadding,
            transform: 'rotateY(360deg)',
            transition: 'all 0.7s',
            opacity: flipped ? '1' : '0',
            boxSizing: 'border-box'
          }}>
            <div style={{
              display: 'flex',
              flexDirection: 'column',
              height: '100%'
            }}>
              <div style={{
                textAlign: 'center',
                marginBottom: '16px'
              }}>
                <div style={{
                  fontSize: windowWidth < 480 ? '20px' : '24px',
                  fontWeight: 'bold',
                  color: '#1F2937'
                }}>Birthday Party</div>
                
                {recipientName && !senderMode ? (
                  <div style={{
                    padding: '8px 12px',
                    background: 'linear-gradient(to right, #EDE9F8, #FCE7F3)',
                    borderRadius: '8px',
                    marginTop: '8px',
                    marginBottom: '12px',
                    boxShadow: '0 2px 4px rgba(0,0,0,0.05)'
                  }}>
                    <span style={{
                      fontSize: windowWidth < 480 ? '16px' : '18px',
                      fontWeight: '500',
                      background: 'linear-gradient(to right, #9333EA, #EC4899)',
                      WebkitBackgroundClip: 'text',
                      WebkitTextFillColor: 'transparent'
                    }}>
                      You are invited, {recipientName}!
                    </span>
                  </div>
                ) : (
                  <div style={{
                    fontSize: '14px',
                    color: '#6B7280'
                  }}>Please join us to celebrate</div>
                )}
              </div>
              
              <div style={{
                display: 'flex',
                flexDirection: 'column',
                marginBottom: '16px'
              }}>
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  marginBottom: '8px'
                }}>
                  <div style={{
                    width: '32px',
                    color: '#EC4899'
                  }}>📅</div>
                  <div style={{ 
                    color: '#374151',
                    fontSize: windowWidth < 480 ? '14px' : '16px'
                  }}>Saturday, April 15th, 2025</div>
                </div>
                
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  marginBottom: '8px'
                }}>
                  <div style={{
                    width: '32px',
                    color: '#EC4899'
                  }}>🕒</div>
                  <div style={{ 
                    color: '#374151',
                    fontSize: windowWidth < 480 ? '14px' : '16px'
                  }}>7:00 PM</div>
                </div>
                
                <div style={{
                  display: 'flex',
                  alignItems: 'center'
                }}>
                  <div style={{
                    width: '32px',
                    color: '#EC4899'
                  }}>📍</div>
                  <div style={{ 
                    color: '#374151', 
                    fontSize: windowWidth < 480 ? '14px' : '16px'
                  }}>123 Celebration Ave</div>
                </div>
              </div>
              
              <div style={{
                marginTop: 'auto',
                textAlign: 'center',
                color: '#6B7280',
                fontSize: windowWidth < 480 ? '12px' : '14px'
              }}>
                <p style={{ margin: '4px 0' }}>RSVP by April 1st</p>
                <p style={{ margin: '4px 0' }}>contact@yourbusiness.com</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BirthdayInvitationCard;