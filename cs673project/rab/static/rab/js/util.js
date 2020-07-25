function millisToTimeString(millis){
    
    if(millis < 0){
        millis = -1 * millis;
    }
    
    
    // Pad to 2 or 3 digits, default is 2
    function pad(n, z) {
    z = z || 2;
    return ('00' + n).slice(-z);
    }
    
    let ms = millis % 1000;
    millis = (millis - ms) / 1000;
    let second = millis % 60;
    millis = (millis - second) / 60;
    let min = millis % 60;
    let hour = (millis - min) / 60;
    
    return pad(hour) + ":" + pad(min) + ":" + pad(second);
}