from fabric.api import cd, local, run

REPO_URL = 'https://github.com/shmik/discurber.git'

def deploy():
    site_folder = '/home/simon/code'
    with cd(site_folder):
        _get_latest_source()
        _update_virtualenv()
        _update_static_files()
        _update_js_build()

def _get_latest_source():
    run('git fetch')
    current_commit = local("git log -n 1 --format=%H", capture=True)
    run(f'git reset --hard {current_commit}')

def _update_virtualenv():
    run('~/.virtualenvs/discurber/bin/pip install -r discurber/requirements.txt')

def _update_static_files():
    run('~/.virtualenvs/discurber/bin/python discurber/manage.py collectstatic --noinput')

def _update_static_files():
    run('~/.virtualenvs/discurber/bin/python discurber/manage.py migrate --noinput')

def _update_js_build():
    run('npm run build')
