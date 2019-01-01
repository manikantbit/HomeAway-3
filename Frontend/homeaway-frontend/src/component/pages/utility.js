export function formHandle(data) {
    let values = {};
        let allInput = data.querySelectorAll('input');
        for(let i =0;i<allInput.length;i++){
            if(allInput[i].type!=="radio" && allInput[i].value!==""){
                values[allInput[i].name] = allInput[i].value.trim();
            } else if (allInput[i].checked === true) {
                values[allInput[i].name] = allInput[i].value.trim(); // "0"- Applicant "1"-Recruiter
            }
        }
    return values;
}