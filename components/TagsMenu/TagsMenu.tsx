'use client';

import { useState } from 'react';
import Link from 'next/link';
import css from './TagsMenu.module.css';

const tags = ['All', 'Work', 'Personal', 'Important', 'Todo', 'Meeting', 'Shopping'];

export default function TagsMenu() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => setIsOpen(prev => !prev);
  const closeMenu = () => setIsOpen(false);

  return (
    <div className={css.menuContainer}>
      <button
        className={css.menuButton}
        onClick={toggleMenu}
        aria-expanded={isOpen}
        aria-controls="tags-menu"
      >
        Notes ▾
      </button>

      {isOpen && (
        <ul id="tags-menu" className={css.menuList}>
          {tags.map(tag => {
            const href = `/notes/filter/${tag}`;
            return (
              <li key={tag} className={css.menuItem}>
                <Link
                  href={href}
                  className={css.menuLink}
                  aria-label={`Filter by ${tag}`}
                  onClick={closeMenu} 
                >
                  {tag}
                </Link>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}
