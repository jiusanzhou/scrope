import React from   'react'
import * as icons from "react-icons/fa"

const _mime2types = {

    // genera
    'application/octet-stream': 'stream',
    'text/plain': 'plain',
    'text/css': 'css',
    'text/html': 'html',
    'text/javascript': 'javascript',
    'application/javascript': 'javascript',

    // image
    'image/apng': 'image',
    'image/bmp': 'image',
    'image/gif': 'image',
    'image/x-icon': 'image',
    'image/jpeg': 'image',
    'image/png': 'image',
    'image/svg+xml': 'image',
    'image/tiff': 'image',
    'image/webp': 'image',

    // autdio
    'audio/wave': 'audio',
    'audio/wav': 'audio',
    'audio/x-wav': 'audio',
    'audio/x-pn-wav': 'audio',
    'audio/webm': 'audio',
    'audio/ogg': 'audio',

    // video
    'video/webm': 'video',
    'video/ogg': 'video',

    // maybe both
    'application/ogg': 'video',

    // archive
    'application/gzip': 'archive',
    'application/zip': 'archive',

    // json
    'application/json': 'json',

    // documents
    'application/pdf': 'pdf',
    'application/msword': 'word',
    // TODO:
}

const _type2icons = {
    'plain': 'file-alt',
    'css': 'css3-alt',
    'html': 'file-code',
    'javascript': 'js',
    'json': 'js',
    'image': 'file-image',
    'video': 'file-video',
    'audio': 'file-audio',
    'archive': 'file-archive',
    'pdf': 'file-pdf',
    'word': 'file-word',
}

export const mime2type = (mime) => {
    return _mime2types[mime] || mime
}

export const type2icon = (type) => {
    return _type2icons[type] || 'question-circle'
}

export const mime2icon = (mime) => {
    let name = 'fa-reg-' + type2icon(mime2type(mime))
    name = name.split('-').map(i => i[0].toUpperCase() + i.slice(1)).join("")
    return React.createElement(icons[name])
}