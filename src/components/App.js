import React, { useState, useEffect } from 'react';

function App() {
    const [currentValue, updateValue] = useState("Hello World");

    useEffect(() => {
        console.log("상태값이 변하고 있습니다.") 
    }, [ currentValue ]);

    return <>
        <input type="text" onChange={(e) => { updateValue(e.target.value) }} placeholder="아무거나 쓰세요" />
        <p>{currentValue}</p>
    </>
}

export default App