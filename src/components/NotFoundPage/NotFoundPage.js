import React from 'react';
import { Link } from 'react-router-dom';

import './NotFoundPage.css';

function NotFoundPage () {
  return (
    <div className="not-found">
      <h3 className="not-found__title">
       <span>404</span> <br /> Страница не найдена
      </h3>
      <Link className="not-found__button-back" to="/">Назад</Link>
    </div>
  )
}

export default NotFoundPage;