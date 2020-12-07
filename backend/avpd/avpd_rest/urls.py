from django.urls import path

from avpd.avpd_rest import views

urlpatterns = [
    path('users/steve_beve/essays', views.EssaysView.as_view()),
    path('users/steve_beve/essays/<str:pk>/report', views.EssayReportView.as_view())
]
