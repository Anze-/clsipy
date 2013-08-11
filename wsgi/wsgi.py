import web
import utilities
import os

HOME = os.getenv('DOTCLOUD_PYTHON_HTTP_URL', 'http://clsi-pacbard.dotcloud.com/')
DIR = '/home/dotcloud/current/'

urls = (
    '/', 'index',
    '/compile', 'compile',
    '/download/(.+)', 'download',
    '/install', 'install'
)

render = web.template.render(DIR+'templates/')

class index:
    def GET(self):
        try:
            f = open(DIR+'static/index.html', 'r')
            return f.read()
        except:
            return 'File not found' # you can send an 404 error here if you want
        
class compile:
    def GET(self):
        return 'clsi compiler'
    def POST(self):
        clsi = utilities.clsi()
        to_compile = clsi.parse(web.data())
        [log, pdf] = clsi.run(to_compile)
        if pdf is None:
            log = HOME+"download/"+log
            return render.failure(log)
        else:
            pdf = HOME+'download/'+pdf
            log = HOME+'download/'+log
            return render.success(pdf, log)

class download:
    def GET(self, file):
        try:
            f = open(DIR+'static/download'+'/'+file, 'r')
            return f.read()
        except:
            return 'File not found' # you can send an 404 error here if you want
            
app = web.application(urls, globals())

if __name__ == '__main__':
    app.run()
else:
    web.config.debug = False
    application = app.wsgifunc()
