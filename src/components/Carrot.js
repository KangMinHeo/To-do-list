import React, { useState } from 'react';
import { notCompletedStyle, CompletedStyle } from '../styles/CarrotStyle';

import '../styles/Carrot.css';

function TodoList() {

    const [todos, updateTodos] = useState([]); // 할일을 의미하는 배열
    const [currentText, updateText] = useState(""); // 인풋에 써져 있는 내용
    const [lastId, updateLastId] = useState(7); // 아이디 값 설정

    // 추가
    const handleSubmit = (event) => {
        event.preventDefault();
        updateTodos([...todos, { content: currentText, id: lastId, isCompleted: false }])
        // todos의 내용을 복사해서 반환한다. (스프레드 연산자 사용)
        updateLastId(lastId + 3) // id 값 중복안되게 id 값 증가하면서 부여
        updateText("") // 추가 후 input값 초기화
    }

    // 삭제
    const handleDelete = (removeId) => {
        // removeId값만 지우고 나머진 남긴다. => filter를 이용한다.
        // 콜백이 true를 반환할 때만 남겨둔다.
        const newTodos = todos.filter((todo) => {
            return todo.id !== removeId
        })
        updateTodos(newTodos)
    }

    // 완료
    const handleComplete = (completeId) => {
        // completeId와 일치하는 것을 찾아야하며, 갯수는 유지 + 내용에 선 긋기
        const newTodos = todos.map((todo) => {
            return todo.id === completeId ? // 변경할 아디값이 completeId와 일치한다면 
                { ...todo, isCompleted: !todo.isCompleted } : todo
            // 위 조건이 참이면 : todo값을 스프레드 연산자로 불러오고 isCompleted의 값을 반전 시켜준다.
            // 스프레드 연산자 : 배열 또는 객체의 값을 그대로 가져온다. 객체는 동일한 아이디 값을 가질 수 없다.
            // 위 조건이 거짓이면 : 일치 하지 않다면 todo 그대로 반환.
        })
        updateTodos(newTodos)
    }

    return <>
        <div className="div_all">
            <div className="div_title">
                <h1>할 일 목록 만들기</h1>
                <form onSubmit={handleSubmit} className="set_list">
                    <input type="text" placeholder="🔎 할 일을 작성하세요." value={currentText}
                        onChange={e => updateText(e.target.value)} className="input_todo" />
                    <button type="submit" className="btn_add">추가</button>

                </form>
            </div>
            <div className="div_use">
                <h3>사용법</h3>
                <p>1. 칸에 내용을 채우고 추가 버튼 클릭 :<br/> 하단에 리스트 생성</p>
                <p>2. 리스트 내 목록 내용 클릭 :<br/> 선긋기로 완료 목록 표시</p>
                <p>3. 내용 옆 X 클릭 : <br/>해당 내용 리스트 내 삭제</p>
                <p className="p_ps">※ 해당 내용은 작성 칸을 클릭시 사라집니다.</p>
            </div>
        </div>
        <ul>
            {todos.map((todo, index) => {
                return <li key={index}>
                    <span style={todo.isCompleted ? CompletedStyle : notCompletedStyle}
                        onClick={() => handleComplete(todo.id)} className="span_list">{todo.content}</span>
                    <span onClick={() => handleDelete(todo.id)} className="del_list">&nbsp;&nbsp;X</span>
                </li>
            })}
        </ul>
    </>
}

export default TodoList

/*
    할 일 목록 만들기
        1. 배열을 관리해야한다.
        2. 할 일 추가를 위해 입력창을 써야 한다.
        3. 할 일을 다 했으면 지울 수 있어야 한다.
        4. 할 일의 상태를 바꿀 수도 있어야 한다.
*/