// this file needs to be .js to have access to webpack loaders

import MathQuill from 'exports-loader?window.MathQuill!imports-loader?window.jQuery=jquery/dist/jquery.slim!../../external/mathquill.js'

MathQuill.getInterface(2)

import '../../external/mathquill.css'

export default MathQuill
