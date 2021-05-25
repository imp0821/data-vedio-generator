from django.conf.urls import url
from django.views.decorators.csrf import csrf_exempt
from . import views
from backend import settings
from django.conf.urls.static import static

urlpatterns = [
    url(r'^test/$', views.testView.as_view(), name="test"),
    url(r'^home/$', views.homeView.as_view(), name="main"),
    url(r'^generateAE/$', views.GenerateAE.as_view(), name="generate"),
    url(r'^getToken/$',views.csrf_token.as_view(), name="getToken")
] + static(settings.STATIC_URL, document_root=settings.STATIC_ROOT)
