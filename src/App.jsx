import React, { useState, useEffect } from 'react';

const questions = [
  {
    q: "It's 2am. You just got a wild project idea. You:",
    a: [
      { text: "Start building immediately. Sleep is for the weak.", type: "midnight" },
      { text: "Add it to my 47 other unfinished projects", type: "chaos" },
      { text: "Design the perfect logo first, obviously", type: "design" },
      { text: "Order parts from Adafruit", type: "hardware" },
      { text: "Check if someone already open-sourced it", type: "opensource" }
    ]
  },
  {
    q: "Your ideal hackathon snack?",
    a: [
      { text: "Coffee. Just coffee. IV drip preferred.", type: "midnight" },
      { text: "Whatever's free and within arm's reach", type: "chaos" },
      { text: "Aesthetically arranged fruit (for the vibes)", type: "design" },
      { text: "Soldering fumes count as nutrition right?", type: "hardware" },
      { text: "Sharing snacks with the whole team!", type: "opensource" }
    ]
  },
  {
    q: "Your code comments be like:",
    a: [
      { text: "// TODO: fix this later (written 3 years ago)", type: "midnight" },
      { text: "// idk why this works but don't touch it", type: "chaos" },
      { text: "Beautiful ASCII art documentation", type: "design" },
      { text: "// pin 7 goes brrrrr", type: "hardware" },
      { text: "Full JSDoc with examples and edge cases", type: "opensource" }
    ]
  },
  {
    q: "Pick your weapon:",
    a: [
      { text: "VS Code at 3am with lo-fi playing", type: "midnight" },
      { text: "Vim because I like chaos", type: "chaos" },
      { text: "Figma (code is just visual design right?)", type: "design" },
      { text: "A soldering iron and pure determination", type: "hardware" },
      { text: "GitHub Codespaces so anyone can contribute", type: "opensource" }
    ]
  },
  {
    q: "Your project README has:",
    a: [
      { text: "\"it works on my machine\" and nothing else", type: "midnight" },
      { text: "17 random GIFs and zero instructions", type: "chaos" },
      { text: "Custom badges, perfect formatting, hero image", type: "design" },
      { text: "Circuit diagrams and pinout tables", type: "hardware" },
      { text: "Contributing guide, code of conduct, the works", type: "opensource" }
    ]
  },
  {
    q: "You're debugging. Your strategy?",
    a: [
      { text: "console.log('HERE') console.log('HERE2') console.log('WHY')", type: "midnight" },
      { text: "Delete everything and start over", type: "chaos" },
      { text: "The bug is actually a feature now", type: "design" },
      { text: "Get out the oscilloscope", type: "hardware" },
      { text: "Search for similar issues on GitHub", type: "opensource" }
    ]
  }
];

const archetypes = {
  midnight: {
    name: "THE MIDNIGHT SHIPPER",
    emoji: "🌙",
    color: "#a855f7",
    desc: "You ship code while the world sleeps. Your best work happens when normal people are dreaming. Caffeine flows through your veins.",
    traits: ["Night owl extraordinaire", "Ships at ungodly hours", "\"I'll sleep when I'm done\""],
    power: "Time dilation after midnight"
  },
  chaos: {
    name: "THE CHAOS GOBLIN",
    emoji: "👹",
    color: "#22c55e",
    desc: "Your projects are beautiful disasters. You break things to understand them. Your code works and nobody knows why, including you.",
    traits: ["Embraces the unknown", "Speed > perfection", "\"It's not a bug, it's emergent behavior\""],
    power: "Making impossible things work (somehow)"
  },
  design: {
    name: "THE PIXEL PERFECTIONIST",
    emoji: "✨",
    color: "#f472b6",
    desc: "Form AND function. Your projects look incredible. You've spent 4 hours on button hover states and regret nothing.",
    traits: ["Allergic to ugly UIs", "CSS wizard", "\"The padding is off by 2px\""],
    power: "Making devs feel bad about their UIs"
  },
  hardware: {
    name: "THE HARDWARE WIZARD",
    emoji: "⚡",
    color: "#f59e0b",
    desc: "Atoms over bits. You make electrons dance. Your desk is covered in microcontrollers, wires, and dreams.",
    traits: ["Speaks to machines", "Has 47 Raspberry Pis", "\"I can build that\""],
    power: "Bringing code into the physical realm"
  },
  opensource: {
    name: "THE OPEN SOURCE HERO",
    emoji: "🦸",
    color: "#06b6d4",
    desc: "You build for everyone. Documentation is your love language. Your PRs are legendary. The community is your family.",
    traits: ["Docs enthusiast", "PR review champion", "\"Have you tried contributing upstream?\""],
    power: "Multiplying impact through collaboration"
  }
};

export default function HackClubQuiz() {
  const [currentQ, setCurrentQ] = useState(0);
  const [scores, setScores] = useState({ midnight: 0, chaos: 0, design: 0, hardware: 0, opensource: 0 });
  const [result, setResult] = useState(null);
  const [started, setStarted] = useState(false);
  const [glitch, setGlitch] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setGlitch(true);
      setTimeout(() => setGlitch(false), 150);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  const handleAnswer = (type) => {
    const newScores = { ...scores, [type]: scores[type] + 1 };
    setScores(newScores);
    
    if (currentQ < questions.length - 1) {
      setCurrentQ(currentQ + 1);
    } else {
      const winner = Object.entries(newScores).reduce((a, b) => a[1] > b[1] ? a : b)[0];
      setResult(archetypes[winner]);
    }
  };

  const restart = () => {
    setCurrentQ(0);
    setScores({ midnight: 0, chaos: 0, design: 0, hardware: 0, opensource: 0 });
    setResult(null);
    setStarted(false);
  };

  return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #0a0a0f 0%, #1a0a2e 50%, #0f172a 100%)',
      fontFamily: "'Space Mono', monospace",
      color: '#e2e8f0',
      position: 'relative',
      overflow: 'hidden'
    }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Space+Mono:wght@400;700&family=Orbitron:wght@700;900&display=swap');
        
        @keyframes float {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-20px) rotate(5deg); }
        }
        
        @keyframes pulse {
          0%, 100% { opacity: 0.5; transform: scale(1); }
          50% { opacity: 1; transform: scale(1.1); }
        }
        
        @keyframes scanline {
          0% { transform: translateY(-100%); }
          100% { transform: translateY(100vh); }
        }
        
        @keyframes glitch {
          0% { transform: translate(0); }
          20% { transform: translate(-2px, 2px); }
          40% { transform: translate(-2px, -2px); }
          60% { transform: translate(2px, 2px); }
          80% { transform: translate(2px, -2px); }
          100% { transform: translate(0); }
        }
        
        @keyframes borderGlow {
          0%, 100% { box-shadow: 0 0 5px currentColor, 0 0 10px currentColor, 0 0 20px currentColor; }
          50% { box-shadow: 0 0 10px currentColor, 0 0 20px currentColor, 0 0 40px currentColor; }
        }
        
        @keyframes slideIn {
          from { transform: translateX(-100%); opacity: 0; }
          to { transform: translateX(0); opacity: 1; }
        }
        
        .glitch-text {
          animation: ${glitch ? 'glitch 0.15s ease' : 'none'};
        }
        
        .answer-btn {
          background: rgba(255,255,255,0.03);
          border: 1px solid rgba(255,255,255,0.1);
          padding: 16px 24px;
          border-radius: 8px;
          color: #e2e8f0;
          font-family: 'Space Mono', monospace;
          font-size: 14px;
          cursor: pointer;
          transition: all 0.3s ease;
          text-align: left;
          width: 100%;
          position: relative;
          overflow: hidden;
        }
        
        .answer-btn:hover {
          background: rgba(168, 85, 247, 0.2);
          border-color: #a855f7;
          transform: translateX(8px);
          box-shadow: 0 0 20px rgba(168, 85, 247, 0.3);
        }
        
        .answer-btn::before {
          content: '>';
          position: absolute;
          left: -20px;
          opacity: 0;
          transition: all 0.3s ease;
          color: #a855f7;
        }
        
        .answer-btn:hover::before {
          left: 8px;
          opacity: 1;
        }
        
        .start-btn {
          background: linear-gradient(135deg, #a855f7 0%, #ec4899 100%);
          border: none;
          padding: 20px 48px;
          border-radius: 12px;
          color: white;
          font-family: 'Orbitron', sans-serif;
          font-size: 18px;
          font-weight: 700;
          cursor: pointer;
          transition: all 0.3s ease;
          text-transform: uppercase;
          letter-spacing: 2px;
        }
        
        .start-btn:hover {
          transform: scale(1.05);
          box-shadow: 0 0 40px rgba(168, 85, 247, 0.5);
        }
        
        .trait-tag {
          background: rgba(255,255,255,0.1);
          padding: 8px 16px;
          border-radius: 20px;
          font-size: 12px;
          border: 1px solid rgba(255,255,255,0.2);
        }
      `}</style>
      
      {/* Animated background elements */}
      <div style={{ position: 'absolute', inset: 0, overflow: 'hidden', pointerEvents: 'none' }}>
        {[...Array(20)].map((_, i) => (
          <div key={i} style={{
            position: 'absolute',
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            width: `${Math.random() * 100 + 50}px`,
            height: `${Math.random() * 100 + 50}px`,
            background: `radial-gradient(circle, ${['#a855f7', '#ec4899', '#06b6d4', '#22c55e'][i % 4]}20 0%, transparent 70%)`,
            animation: `float ${Math.random() * 10 + 10}s ease-in-out infinite`,
            animationDelay: `${Math.random() * 5}s`,
          }} />
        ))}
        
        {/* Scanline effect */}
        <div style={{
          position: 'absolute',
          width: '100%',
          height: '4px',
          background: 'linear-gradient(transparent, rgba(168, 85, 247, 0.1), transparent)',
          animation: 'scanline 8s linear infinite',
        }} />
        
        {/* Grid overlay */}
        <div style={{
          position: 'absolute',
          inset: 0,
          backgroundImage: `
            linear-gradient(rgba(168, 85, 247, 0.03) 1px, transparent 1px),
            linear-gradient(90deg, rgba(168, 85, 247, 0.03) 1px, transparent 1px)
          `,
          backgroundSize: '50px 50px',
        }} />
      </div>

      <div style={{
        maxWidth: '700px',
        margin: '0 auto',
        padding: '40px 20px',
        position: 'relative',
        zIndex: 1,
      }}>
        
        {/* Header */}
        <div style={{ textAlign: 'center', marginBottom: '40px' }}>
          <div style={{
            fontSize: '12px',
            color: '#a855f7',
            letterSpacing: '4px',
            marginBottom: '12px',
            fontFamily: "'Space Mono', monospace",
          }}>
            [ HACK CLUB PRESENTS ]
          </div>
          <h1 className="glitch-text" style={{
            fontFamily: "'Orbitron', sans-serif",
            fontSize: 'clamp(24px, 6vw, 42px)',
            fontWeight: 900,
            background: 'linear-gradient(135deg, #a855f7 0%, #ec4899 50%, #06b6d4 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            margin: 0,
            lineHeight: 1.2,
          }}>
            WHAT TYPE OF HACKER ARE YOU?
          </h1>
          <div style={{
            width: '100px',
            height: '3px',
            background: 'linear-gradient(90deg, #a855f7, #ec4899)',
            margin: '20px auto',
            borderRadius: '2px',
          }} />
        </div>

        {/* Main content */}
        {!started ? (
          <div style={{
            textAlign: 'center',
            animation: 'slideIn 0.5s ease',
          }}>
            <div style={{
              fontSize: '80px',
              marginBottom: '20px',
              animation: 'float 3s ease-in-out infinite',
            }}>
              🖥️
            </div>
            <p style={{
              fontSize: '16px',
              color: '#94a3b8',
              marginBottom: '32px',
              lineHeight: 1.8,
            }}>
              Answer 6 questions to discover your<br/>
              <span style={{ color: '#a855f7' }}>Hack Club hacker archetype</span>
            </p>
            <button className="start-btn" onClick={() => setStarted(true)}>
              Initialize Quiz
            </button>
          </div>
        ) : result ? (
          <div style={{
            textAlign: 'center',
            animation: 'slideIn 0.5s ease',
          }}>
            <div style={{
              fontSize: '14px',
              color: '#64748b',
              marginBottom: '8px',
              letterSpacing: '2px',
            }}>
              YOUR ARCHETYPE IS...
            </div>
            <div style={{
              fontSize: '100px',
              marginBottom: '16px',
              filter: 'drop-shadow(0 0 30px ' + result.color + ')',
            }}>
              {result.emoji}
            </div>
            <h2 style={{
              fontFamily: "'Orbitron', sans-serif",
              fontSize: '32px',
              color: result.color,
              margin: '0 0 16px 0',
              textShadow: `0 0 30px ${result.color}50`,
            }}>
              {result.name}
            </h2>
            <p style={{
              fontSize: '16px',
              color: '#94a3b8',
              lineHeight: 1.8,
              marginBottom: '24px',
            }}>
              {result.desc}
            </p>
            
            <div style={{
              display: 'flex',
              flexWrap: 'wrap',
              gap: '8px',
              justifyContent: 'center',
              marginBottom: '24px',
            }}>
              {result.traits.map((trait, i) => (
                <span key={i} className="trait-tag">{trait}</span>
              ))}
            </div>
            
            <div style={{
              background: 'rgba(255,255,255,0.05)',
              border: '1px solid ' + result.color + '40',
              borderRadius: '12px',
              padding: '20px',
              marginBottom: '32px',
            }}>
              <div style={{ fontSize: '12px', color: '#64748b', marginBottom: '8px' }}>
                SPECIAL POWER
              </div>
              <div style={{ color: result.color, fontSize: '18px', fontWeight: 700 }}>
                ⚡ {result.power}
              </div>
            </div>
            
            <button className="start-btn" onClick={restart}>
              Retake Quiz
            </button>
          </div>
        ) : (
          <div style={{ animation: 'slideIn 0.3s ease' }} key={currentQ}>
            <div style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              marginBottom: '24px',
            }}>
              <span style={{ color: '#64748b', fontSize: '14px' }}>
                QUESTION {currentQ + 1}/{questions.length}
              </span>
              <div style={{
                display: 'flex',
                gap: '6px',
              }}>
                {questions.map((_, i) => (
                  <div key={i} style={{
                    width: '24px',
                    height: '4px',
                    borderRadius: '2px',
                    background: i <= currentQ ? 'linear-gradient(90deg, #a855f7, #ec4899)' : 'rgba(255,255,255,0.1)',
                    transition: 'all 0.3s ease',
                  }} />
                ))}
              </div>
            </div>
            
            <h2 style={{
              fontSize: '24px',
              fontWeight: 700,
              marginBottom: '32px',
              lineHeight: 1.4,
            }}>
              {questions[currentQ].q}
            </h2>
            
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              {questions[currentQ].a.map((answer, i) => (
                <button
                  key={i}
                  className="answer-btn"
                  onClick={() => handleAnswer(answer.type)}
                  style={{ animationDelay: `${i * 0.1}s` }}
                >
                  {answer.text}
                </button>
              ))}
            </div>
          </div>
        )}
        
        {/* Footer */}
        <div style={{
          marginTop: '60px',
          textAlign: 'center',
          fontSize: '12px',
          color: '#475569',
        }}>
          Made with 💜 for Hack Club
        </div>
      </div>
    </div>
  );
}
