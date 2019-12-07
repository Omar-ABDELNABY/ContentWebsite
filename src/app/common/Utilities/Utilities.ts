export class Utilities {

    public static htmlToText(html: string): string{
        var element: HTMLElement = document.createElement('span');
        element.innerHTML = html;
        return element.innerText;
    }
}