// this file needs to be .js to have access to webpack loaders

import MathQuill from 'exports-loader?window.MathQuill!imports-loader?window.jQuery=jquery/dist/jquery.slim!@entkenntnis/mathquill/build/mathquill.js'

import '@entkenntnis/mathquill/build/mathquill.css'

/*
Useful for local development:

import MathQuill from 'exports-loader?window.MathQuill!imports-loader?window.jQuery=jquery/dist/jquery.slim!../../.external/mathquill.js'

import '../../.external/mathquill.css'
*/

MathQuill.getInterface(2)
export default MathQuill
