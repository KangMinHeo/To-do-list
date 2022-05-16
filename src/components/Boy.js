import React, { useEffect, useRef } from 'react';

function Boy() {
    const refvar = useRef(); // 참조변수 생성

    useEffect(() => {
        console.log(refvar.current.value)
    }, []);

    return <>
        <input ref={refvar} id="aa" value="Hello World"/>
        <input id="bb" />
    </>
}

export default Boy