
const {format }=require('timeago.js');
const helpers = {

};
helpers.timeago= (timestamp)=>{
    return format(timestamp);
}
helpers.ifEquals=(arg1, arg2, options)=>{
    return (arg1 == arg2) ? options.fn(this) : options.inverse(this);}
module.exports = helpers;
helpers.switch=(value, options)=> {
    this._switch_value_ = value;
    var html = options.fn(this); // Process the body of the switch block
    delete this._switch_value_;
    return html;
}

helpers.case=(value, options) =>{
    if (value == this._switch_value_) {
        return options.fn(this);
    }
}