from django.shortcuts import render
from django.shortcuts import HttpResponse
from rest_framework.views import APIView
from django.views.generic import View
import os

class homeView(APIView):
    def get(self, request, *args, **kwargs):
        return render(request, 'index.html')

class testView(APIView):
    def get(self, request, *args, **kwargs):
        if request.method == 'GET':
            print("get response")
            return HttpResponse("OK")

# Create your views here.
