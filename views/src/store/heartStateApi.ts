import axios from 'axios';
const heartAdd = async (title: string) => {
  const res = await axios.post(
    'http://localhost:5000/user/itemAdd',
    {
      title,
    },
    {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('oneroomToken')}`,
      },
    }
  );
};
const heartDel = async (title: string) => {
  const res = await axios.post(
    'http://localhost:5000/user/itemDel',
    {
      title,
    },
    {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('oneroomToken')}`,
      },
    }
  );
};

export { heartAdd, heartDel };
