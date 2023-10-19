import { useCallback, useEffect, useRef, useState } from 'react'

import './App.css'


function App() {
  let [password, setPassword] = useState('')
  let [length, setLength] = useState(8)
  let [hasNumbers, setHasNumbers] = useState(false)
  let [hasSpecialCharacters, setHasSpecialCharacters] = useState(false)
  let [oldPassword, setOldPassword] = useState(new Set())

  const passwordRef = useRef(null)

  const generatePassword = useCallback(()=>{
    let pass = '';
    let str = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
    if(hasNumbers) str += '0123456789';
    if(hasSpecialCharacters) str += '!@#$%^&*()_+~`|}{[]?><,./-=';
    for(let i=0; i<length; i++){
      pass += str.charAt(Math.floor(Math.random()*str.length +1))
    }
    setPassword(pass);
  },[length, hasNumbers, hasSpecialCharacters,setPassword])

  const copyToClipboard = useCallback(() => {
    passwordRef.current?.select();
    passwordRef.current?.setSelectionRange(0, 999);
    window.navigator.clipboard.writeText(password);
    setOldPassword(prevSet => new Set([...prevSet, password]));
  }, [password])


  useEffect(() => {
    generatePassword()
  }, [length, hasNumbers, hasSpecialCharacters, generatePassword]);

  useEffect(()=>{    
    console.log(oldPassword);
  },[oldPassword])

  return (
    <>
      <div className="w-full max-w-md mx-auto shadow-md rounded-lg px-4 py-3 my-8 bg-gray-800 text-orange-500">
        <h1 className='text-white text-center my-3'>Password Generator</h1>
        <div className="flex shadow rounded-lg overflow-hidden mb-4">
          <input
            type='text'
            value={password}
            className="outline-none w-full py-1 px-3"
            readOnly
            ref={passwordRef}
          />
          <button
            className='outline-none bg-blue-700 text-white px-3 py-0.5 shrink-0 hover:bg-blue-800'
            onClick={copyToClipboard}
          >
            Copy</button>
        </div>
        <div className='flex text-sm gap-x-2'> 
          <div className='flex items-center gap-x-1'>
            <input
              type='range'
              min={6}
              max={20}
              value={length}
              className='cursor-pointer'
              onChange={e => setLength(e.target.value)}
            />
            <label>Length {length}</label>
          </div>
          <div className='flex items-center gap-x-1'>
            <input
              type='checkbox'
              defaultChecked={false}
              className='cursor-pointer'
              onClick={()=>{setHasNumbers(prev => !prev)}}
            />
            <label>Numbers</label>
          </div>
        </div>
        <div className='flex items-center gap-x-1'>
            <input
              type='checkbox'
              defaultChecked={false}
              className='cursor-pointer'
              onClick={()=>{setHasSpecialCharacters(prev => !prev)}}
            />
            <label>Spacial Characters</label>
          </div>
          <br className='bg-black'/>
          <div className='flex flex-col gap-2'>
            {Array.from(oldPassword).map((pass, index) => (
              <div key={index}>{index+1}. {pass}</div>
            ))}
          </div>


      </div>       
      
    </>
  )
}

export default App
