# Django settings for www_jamesrhys_net project.

PROD = True # Whether deployed in production servers

if PROD:
  # Absolute filesystem path to the directory that will hold user-uploaded files.
  # Example: "/home/media/media.lawrence.com/media/"
  #MEDIA_ROOT = '/var/www/html/files/www_jamesrhys_net/'
  
  # URL that handles the media served from MEDIA_ROOT. Make sure to use a
  # trailing slash.
  # Examples: "http://media.lawrence.com/media/", "http://example.com/media/"
  #MEDIA_URL = 'www.jamesrhys.net/files/www_jamesrhys_net/'
  DEBUG = True # Django Debug var
  TEMPLATE_DEBUG = True
else:
  # Absolute filesystem path to the directory that will hold user-uploaded files.
  # Example: "/home/media/media.lawrence.com/media/"
  #MEDIA_ROOT = '/var/www/files/www_jamesrhys_net/'
  
  # URL that handles the media served from MEDIA_ROOT. Make sure to use a
  # trailing slash.
  # Examples: "http://media.lawrence.com/media/", "http://example.com/media/"
  #MEDIA_URL = 'http://127.0.0.1/files/www_jamesrhys_net/'
  DEBUG = True # Django Debug var
  TEMPLATE_DEBUG = DEBUG

LCL_ENV = True
LCL_STATIC_PREFIX = '/var/www/django-sites'
LCL_DYNAMIC_PREFIX = '/var/www/files'
PROD_STATIC_PREFIX = '/var/www/html'
PROD_DYNAMIC_PREFIX = '/var/www/html/files'
SITE_PREFIX = '/www_jamesrhys_net'

if LCL_ENV:
  SITE_URL = 'http://www.jamesrhys.net'
  STATIC_FILES_PREFIX = LCL_STATIC_PREFIX + SITE_PREFIX
  DYNAMIC_FILES_PREFIX = LCL_DYNAMIC_PREFIX + SITE_PREFIX
  DEBUG = True
  TEMPLATE_DEBUG = True
else:
  SITE_URL = 'http://www.jamesrhys.net:8080'
  STATIC_FILES_PREFIX = PROD_STATIC_PREFIX + SITE_PREFIX
  DYNAMIC_FILES_PREFIX = PROD_DYNAMIC_PREFIX + SITE_PREFIX
  DEBUG = True
  TEMPLATE_DEBUG = True

ADMINS = (
    ('James Rhys', 'james@jamesrhys.net'),
)

MANAGERS = ADMINS

DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.mysql', # Add 'postgresql_psycopg2', 'mysql', 'sqlite3' or 'oracle'.
        'NAME': 'www_jamesrhys_net',                      # Or path to database file if using sqlite3.
        'USER': 'root',                      # Not used with sqlite3.
        'PASSWORD': 'root',                  # Not used with sqlite3.
        'HOST': 'localhost',                      # Set to empty string for localhost. Not used with sqlite3.
        'PORT': '',                      # Set to empty string for default. Not used with sqlite3.
    }
}

# Local time zone for this installation. Choices can be found here:
# http://en.wikipedia.org/wiki/List_of_tz_zones_by_name
# although not all choices may be available on all operating systems.
# In a Windows environment this must be set to your system time zone.
TIME_ZONE = 'America/Chicago'

# Language code for this installation. All choices can be found here:
# http://www.i18nguy.com/unicode/language-identifiers.html
LANGUAGE_CODE = 'en-us'

SITE_ID = 1

# If you set this to False, Django will make some optimizations so as not
# to load the internationalization machinery.
USE_I18N = True

# If you set this to False, Django will not format dates, numbers and
# calendars according to the current locale.
USE_L10N = True

# If you set this to False, Django will not use timezone-aware datetimes.
USE_TZ = True

# Absolute filesystem path to the directory that will hold user-uploaded files.
# Example: "/home/media/media.lawrence.com/media/"
MEDIA_ROOT = DYNAMIC_FILES_PREFIX
print "media root:",MEDIA_ROOT
# URL that handles the media served from MEDIA_ROOT. Make sure to use a
# trailing slash.
# Examples: "http://media.lawrence.com/media/", "http://example.com/media/"
MEDIA_URL = 'http://www.jamesrhys.net:8080/media/'
print "media url:",MEDIA_URL

# Absolute path to the directory static files should be collected to.
# Don't put anything in this directory yourself; store your static files
# in apps' "static/" subdirectories and in STATICFILES_DIRS.
# Example: "/home/media/media.lawrence.com/static/"
#if LCL_ENV:
#  STATIC_ROOT = STATIC_PREFIX +'/var/www/django-sites/www_futureequation_com/static_files'
#else:
#  STATIC_ROOT = '/var/www/html/www_futureequation_com/static_files'
STATIC_ROOT = STATIC_FILES_PREFIX +'/templates'
print STATIC_ROOT

# URL prefix for static files.
# Example: "http://media.lawrence.com/static/"
STATIC_URL = '/static/'

# Additional locations of static files
    # Put strings here, like "/home/html/static" or "C:/www/django/static".
    # Always use forward slashes, even on Windows.
    # Don't forget to use absolute paths, not relative paths.
#STATICFILES_DIRS = ((STATIC_FILES_PREFIX+'/templates'),)

# List of finder classes that know how to find static files in
# various locations.
STATICFILES_FINDERS = (
    'django.contrib.staticfiles.finders.FileSystemFinder',
    'django.contrib.staticfiles.finders.AppDirectoriesFinder',
#    'django.contrib.staticfiles.finders.DefaultStorageFinder',
)

# Make this unique, and don't share it with anybody.
SECRET_KEY = '2&amp;(eiz3sy4qyuf4=xnd7ewnb0x%v6i@+$9@ws5u18@@_ebl3wc'

# List of callables that know how to import templates from various sources.
TEMPLATE_LOADERS = (
    'django.template.loaders.filesystem.Loader',
    'django.template.loaders.app_directories.Loader',
#     'django.template.loaders.eggs.Loader',
)

MIDDLEWARE_CLASSES = (
    'django.middleware.common.CommonMiddleware',
    'django.contrib.sessions.middleware.SessionMiddleware',
    'django.middleware.csrf.CsrfViewMiddleware',
    'django.contrib.auth.middleware.AuthenticationMiddleware',
    'django.contrib.messages.middleware.MessageMiddleware',
## CACHEING - per-site
#    'django.middleware.cache.UpdateCacheMiddleware',
#    'django.middleware.common.CommonMiddleware',
#    'django.middleware.cache.FetchFromCacheMiddleware',
    # Uncomment the next line for simple clickjacking protection:
    # 'django.middleware.clickjacking.XFrameOptionsMiddleware',
)

ROOT_URLCONF = 'www_jamesrhys_net.urls'

# Python dotted path to the WSGI application used by Django's runserver.
WSGI_APPLICATION = 'www_jamesrhys_net.wsgi.application'

SERIALIZATION_MODULES = {
  'json': 'wadofstuff.django.serializers.json'
}

TEMPLATE_DIRS = (
  STATIC_FILES_PREFIX + '/views/templates',
  STATIC_FILES_PREFIX + '/templates'
)

INSTALLED_APPS = (
    'django.contrib.auth',
    'django.contrib.contenttypes', # Allows for generic Foreign Keys
    'django.contrib.sessions',
    'django.contrib.sites',
    'django.contrib.messages',
    'django.contrib.staticfiles',
    'app',
    'api',
    'labs',
    # Uncomment the next line to enable the admin:
    'django.contrib.admin',
    # Uncomment the next line to enable admin documentation:
    # 'django.contrib.admindocs',
)

# A sample logging configuration. The only tangible logging
# performed by this configuration is to send an email to
# the site admins on every HTTP 500 error when DEBUG=False.
# See http://docs.djangoproject.com/en/dev/topics/logging for
# more details on how to customize your logging configuration.

LOGGING = {
    'version': 1,
    'disable_existing_loggers': True,
    'formatters': {
        'verbose': {
            'format': '%(levelname)s %(asctime)s %(module)s %(process)d %(thread)d %(message)s'
        },
        'simple': {
            'format': '%(levelname)s %(message)s'
        },
    },
    'handlers': {
        'null': {
            'level': 'DEBUG',
            'class': 'django.utils.log.NullHandler',
        },
        'console':{
            'level': 'DEBUG',
            'class': 'logging.StreamHandler',
            'formatter': 'simple'
        }
    },
    'loggers': {
        'django': {
            'handlers': ['console'],
            'propagate': True,
            'level': 'INFO',
        },
        'django.request': {
            'handlers': ['console'],
            'level': 'ERROR',
            'propagate': False,
        },
    }
}

#CACHES = {
#    'default' : {
#		'BACKEND' : 'django.core.cache.backends.filebased.FileBasedCache',
#		'LOCATION' : '/var/www/html/django_cache'
#	}
#}
#
#CACHE_MIDDLEWARE_SECONDS = 604800 #60*60*24*7 - seconds to cache for - hold cache for a week
#CACHE_MIDDLEWARE_KEY_PREFIX = 'www_jamesrhys_net' # Prefix for cache keys
