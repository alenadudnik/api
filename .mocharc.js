module.exports = {
    require: '@babel/register',
    spec: 'tests/**/*.spec.js',
    ignore: 'tests/example.spec.js',
    file: 'config/setup.js',
    timout: 15000
}