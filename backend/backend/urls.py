from django.contrib import admin
from django.urls import path, include, re_path
from django.views.generic import TemplateView
from rest_framework.authtoken.views import obtain_auth_token
from django.conf import settings
from django.conf.urls.static import static
from rest_framework_simplejwt.views import TokenObtainPairView,TokenRefreshView
from django.views.static import serve



urlpatterns = [

    

    
    re_path(r'^media/(?P<path>.*)$', serve, {'document_root': settings.MEDIA_ROOT}),
    path('admin/', admin.site.urls),
    path('api-auth/', include('rest_framework.urls')),
    # path('api/login/',obtain_auth_token),

     path('api/token/',TokenObtainPairView.as_view(),name='get_token'),
    path('api/token/refresh/',TokenRefreshView.as_view(),name='refresh'),
    path('api/',include('api.urls'))
]


# ✅ Static শুধু লোকাল ডেভেলপমেন্টে serve হবে
if settings.DEBUG:
    urlpatterns += static(settings.STATIC_URL, document_root=settings.STATIC_ROOT)

# ✅ SPA fallback route (React)
urlpatterns += [
    re_path(r'^.*$', TemplateView.as_view(template_name='index.html')),
]