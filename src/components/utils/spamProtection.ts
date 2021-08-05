export function decay(arr: string[]) {
    const _arr = [...arr];
    for (let i = 0; i < _arr.length; i++) {
        if (_arr[i].replace(/\n/gi, "") == "") {
            _arr.splice(i, 1);
            i--;
        }
    }
    return _arr;
}
export function decay2(content: string) {
    return decay(content.split(' ')).length <= 0
}