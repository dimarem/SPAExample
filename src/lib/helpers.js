/**
 * Возвращает true, если пользователь 
 * использует мобильное устройство,
 * false - в ином случае.
 * 
 * @returns {boolean}
 */
export function isMobile() {
    if (/Android|GoBrowser|webOS|iPhone|iPad|iPod|BlackBerry|BB|PlayBook|IEMobile|Windows Phone|Kindle|Silk|Opera Mini/i.test(navigator.userAgent)) {
        return true;
    } else {
        return false;
    }
}
