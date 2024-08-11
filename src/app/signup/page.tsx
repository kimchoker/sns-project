"use client"
import React, { useState, useEffect } from "react";
import { validateEmail, validatePassword } from "../../components/validation";
import { BsEnvelope, BsFillLockFill } from "react-icons/bs";
import { useRouter } from "next/navigation";


const SignUp: React.FC = () => {

  // ID 부분
  const [inputEmail, setInputEmail] = useState<string>("");
  const [validateID, setValidateID] = useState<boolean>(true);
  const [isIDFocused, setIsIDFocused] = useState<boolean>(false);

  const onChangeEmail = (event: React.ChangeEvent<HTMLInputElement>) => {
    validateEmail(event.target.value, setInputEmail, setValidateID);
  };

  useEffect(() => {
    if (inputEmail === "") {
      setIDInfo("");
      setIDInfoVisible(false);
    } else if (inputEmail !== "" && validateID) {
      setIDInfo("");
    } else {
      setButtonDisabled(true);
      setIDInfo("올바른 형식의 이메일을 입력해주세요");
      setIDInfoVisible(true);
    }
  }, [inputEmail, validateID]);

  // PW 부분
  const [inputPW, setInputPW] = useState<string>("");
  const [validatePW, setValidatePW] = useState<boolean>(true);
  const [isPWFocused, setIsPWFocused] = useState<boolean>(false);

  const onChangePW = (event: React.ChangeEvent<HTMLInputElement>) => {
    validatePassword(event.target.value, setInputPW, setValidatePW);
  }  

  // 이부분 나중에 ref 사용해서 성능 최적화 해야하지 않을까
  useEffect(() => {
    if (inputPW === "") {
      setPWInfo("");
      setPWInfoVisible(false);
    } else if(inputPW !== "" && validatePW) {
      setPWInfo("")
    } else {
      setButtonDisabled(true);
      setPWInfo("비밀번호 형식에 맞추어 입력해주세요");
      setPWInfoVisible(true);
    }
  }, [inputPW, validatePW])


  // button disabled
  const [buttonDisabled, setButtonDisabled] = useState<boolean>(true);
  const [IDInfo, setIDInfo] = useState<string>("");
  const [PWInfo, setPWInfo] = useState<string>("");
  const [IDInfoVisible, setIDInfoVisible] = useState<boolean>(false);
  const [PWInfoVisible, setPWInfoVisible] = useState<boolean>(false);




  // 얘도 나중에 최적화 가능할 것 같구나
  // 아이디 비밀번호가 모두 옳으면
  useEffect(() => {
    if (validateID && validatePW) {
      setButtonDisabled(false);
    }
  }, [validateID, validatePW])

  const router = useRouter();


  return (
    <div
      className="flex justify-center items-center h-screen bg-[#EEEDEB] font-nanum"
    >
      <div
        className="flex justify-center items-center h-3/5 w-2/5 min-w-[300px] min-h-[500px] max-w-[600px] bg-white"
      >
        <div className="w-4/5 flex flex-col">
          <h5 className="font-bold">회원가입</h5>
          <hr />
          <div className="mb-4 flex flex-col">
            <label htmlFor="email" className="mb-2 font-bold text-sm mt-2">
              이메일
            </label>
            <div
              className={`flex 
                          items-center 
                          rounded-md p-2 h-[35px] 
                          transition-colors 
                          duration-500 
                          bg-transparent
                          hover:bg-[#EEEDEB]
                          ${
                            validateID ? "" : "border-red-500"
                          }
                          ${
                            isIDFocused
                              ? "bg-[#EEEDEB] border-2 border-black"
                              : "border-[#EEEDEB]"
                          }
              `}

            >
              <BsEnvelope />
              <input
                id="id"
                type="email"
                value={inputEmail}
                onChange={onChangeEmail}
                onFocus={()=>{setIsIDFocused(true)}}
                onBlur={()=>{setIsIDFocused(false)}}
                className="w-full p-2 bg-transparent border-none focus:outline-none ml-2"
              />
            </div>
            <p
              className={`mt-1 text-red-500 text-xs h-4 ${
                IDInfoVisible ? "visible" : "invisible"
              }`}
            >
              {IDInfo}
            </p>
            <label htmlFor="email" className="mb-2 font-bold text-sm">
              비밀번호
            </label>
            <div
              className={`flex items-center rounded-md p-2 h-[35px] transition-colors duration-500 bg-transparent hover:bg-[#EEEDEB]
                        ${
                          validatePW ? "" : "border-red-500"
                        } 
                        ${
                          isPWFocused
                            ? "bg-[#EEEDEB] border-2 border-black"
                            : "border-[#EEEDEB]"
                        }

              `}
            >
              <BsFillLockFill />
              <input
                id="id"
                type="password"
                value={inputPW}
                onChange={onChangePW}
                onFocus={()=>{setIsPWFocused(true)}}
                onBlur={()=>{setIsPWFocused(false)}}
                className="w-full p-2 bg-transparent border-none focus:outline-none ml-2"
              />
            </div>
            <p
              className={`mt-1 text-red-500 text-xs h-4 ${
                PWInfoVisible ? "visible" : "invisible"
              }`}
            >
              {PWInfo}
            </p>
          </div>
          <button
            disabled={buttonDisabled}
            className={`flex items-center justify-center rounded-md bg-black h-[35px] p-2 transition-all duration-300 ${
              buttonDisabled
                ? "bg-[#C7C8CC] cursor-not-allowed"
                : "hover:bg-gray-700"
            }`}
            onClick={null}
          >
            <p className="text-white text-xs mr-2">회원가입</p>
            
          </button>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
