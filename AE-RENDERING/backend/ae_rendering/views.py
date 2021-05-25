from json.encoder import JSONEncoder
from django.http.response import JsonResponse
from django.shortcuts import render
from django.shortcuts import HttpResponse
from rest_framework.views import APIView
from django.views.generic import View
from django.middleware.csrf import get_token
import json
import os

class csrf_token(APIView):
    def get(self, request):
        if request.method == 'GET':
            csrf_token = get_token(request)
            return JsonResponse(data={'token': csrf_token})
    
    def post(self, request):
        if request.method == 'POST':
            print("")
             

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
            output_path = ""
            return HttpResponse(output_path)

class GenerateAE(View):
    def get(self, request):
        if request.method == 'GET':
            print("get response")
            return HttpResponse("OK")

    def post(self, request):
        if request.method == 'POST':
            input = json.loads(request.body)
            o_data = input["data"]
            type  = input["type"]
             
            if type == "1":
                GeneratePie(o_data)
            elif type == "2":
                GenerateBar(o_data)
            else:
                GenerateLine(o_data)
            
            return HttpResponse("OK")


def GeneratePie(data):
    data_in = []
    for row in data:
        data_in.append(row["data"])
    print(data_in)


def GenerateBar(data):
    data_in = []
    for row in data:
        tmp = []
        tmp.append(row["type1"])
        tmp.append(row["type2"])
        tmp.append(row["type3"])
        data_in.append(tmp)
    print(data_in)

def GenerateLine(data):
    data_in = []
    for row in data:
        tmp = []
        tmp.append(row["type1"])
        tmp.append(row["type2"])
        tmp.append(row["type3"])
        data_in.append(tmp)
    print(data_in)


