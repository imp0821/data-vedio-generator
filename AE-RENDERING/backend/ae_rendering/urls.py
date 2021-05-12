from django.conf.urls import url
from django.views.decorators.csrf import csrf_exempt
from . import views
from backend import settings

urlpatterns = [
    url(r'^test/$', views.testView.as_view(), name="test"),
    url(r'^home/$', views.homeView.as_view(), name="main"),
]