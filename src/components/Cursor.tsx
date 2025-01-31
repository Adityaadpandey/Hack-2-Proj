import { useEffect } from "react";
import gsap from 'gsap';


function Cursor() {
    const dim = 40;
    useEffect(() => {
        const cursor: HTMLElement | null = document.getElementById('cursor');
        if (cursor) {
            cursor.style.height = `${dim}px`;
            cursor.style.width = `${dim}px`;
            document.addEventListener('mousemove', (e) => {
                gsap.to('#cursor', {
                    x: e.clientX - dim / 2,
                    y: e.clientY - dim / 2,
                    duration: 0.2,
                });
            });
            cursor.addEventListener('click', (e) => {
                cursor.style.display = 'none';
                console.log('click');
                const elementBelow = document.elementFromPoint(e.clientX, e.clientY);
                if (elementBelow) {
                    (elementBelow as HTMLElement).click();
                }
                cursor.style.display = 'block';
            });
        }
    }, []);
    return (
        <span id='cursor' className='fixed bg-white rounded-[50%] z-[1000] mix-blend-difference'>
        </span>
    );
}

export default Cursor;

function click(e: any, cursor: HTMLElement, dim: number) {

}