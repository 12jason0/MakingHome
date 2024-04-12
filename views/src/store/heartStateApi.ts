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

const heartView = async () => {
  const res = await axios.get('http://localhost:5000/user/itemView', {
    headers: {
      Authorization: `Bearer ${localStorage.getItem('oneroomToken')}`,
    },
  });
  const { viewItem } = res.data;
  console.log('view', viewItem);
  return viewItem;
};

export { heartAdd, heartDel };
// heartView
