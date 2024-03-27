const axios = require('axios');
const kakaoUser = async(req,res) => {
    try {
        console.log('React에서 서버 API에 데이터 전송 성공');
        const {access_token} = req.body;
        console.log('access_token',access_token);
        try {
            const userInfo = await axios.get('https://kapi.kakao.com/v2/user/me',{
                headers: {
                    'Content-Type':'application/x-www-form-urlencoded',
                    'Authorization': `Bearer ${access_token}`
                }
            }); 
            console.log('userInfo : ',userInfo);
            res.json({result:userInfo.data});
        }
        catch(e){
            console.log('e',e);
        }
    }   
    catch(e) {
        // console.log('에러',e);
    }
}

module.exports = {kakaoUser};