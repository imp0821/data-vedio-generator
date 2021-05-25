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
    
    def post(self, request):
        if request.method == 'POST':
            print("start render")
            file_obj = request.FILES.get('file')
            print(file_obj, type(file_obj))
            # move apex to our directory
            # file_path = os.path.join(settings.MEDIA_ROOT, file_obj.name)
            # f = open(file_path, 'wb+')
            # for chunk in file_obj.chunks():
            #     f.write(chunk)
            # f.close()
            # ae_path = "F:\mytool\AE\Adobe After Effects CC 2019\Support Files"
            # output_path = ae_render(ae_path, file_path)
            # print(output_path)
            output_path = ""
            return HttpResponse(output_path)

# Create your views here.
