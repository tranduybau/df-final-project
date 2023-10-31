import ROUTES from '@/constants/ROUTES';
import getID from '@/lib/getID';

const faker = {
  features: [
    {
      id: getID(),
      title: 'Easy to use:',
      description: 'Easy to use, easy to learn.',
      href: ROUTES.HOME,
    },
    {
      id: getID(),
      title: 'Detailed guides with clear explanations:',
      description: 'Detailed guides with clear explanations simplify learning.',
      href: ROUTES.HOME,
    },
    {
      id: getID(),
      title: 'Interactive code assistance:',
      description: 'Interactive code assistance enhances learning and skills.',
      href: ROUTES.HOME,
    },
    {
      id: getID(),
      title: 'Expert AI guidance:',
      description: 'Expert AI guidance guarantees accurate and helpful advice.',
      href: ROUTES.HOME,
    },
  ],
  about_us: [
    {
      id: getID(),
      name: 'Dev Quèn',
      real_name: 'Khang',
      github: 'https://github.com/nguyenhoaikhang37',
      portfolio: '',
      avatar: '/images/khang.png',
    },
    {
      id: getID(),
      name: 'Mr B',
      real_name: 'Báu',
      github: 'https://github.com/tranduybau',
      avatar: '/images/bau.png',
    },
  ],
};

export default faker;
