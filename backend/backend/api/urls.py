from django.urls import path

from backend.api import views

urlpatterns = [
    path('public-dummy', views.public_dummy),
    path('private-dummy', views.private_dummy),
    # path('users/steve_beve/essays', views.EssaysView.as_view()),
    # path('users/steve_beve/essays/<str:pk>/report', views.EssayReportView.as_view())
]
