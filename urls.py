\from django.conf.urls import url, include
from rest_framework import routers
from proxicode.api import views_
from django.contrib import admin
from rest_framework.urlpatterns import format_suffix_patterns

admin.autodiscover()

#from rest_framework.authtoken import views

router = routers.DefaultRouter()
router.register(r'users', views_.UserViewSet)
router.register(r'groups', views_.GroupViewSet)
router.register(r'categories',views_.CategoryViewSet)
router.register(r'photos',views_.PhotoViewSet)
router.register(r'accounts',views_.AccountViewSet)
router.register(r'products',views_.ProductViewSet)
router.register(r'medias',views_.MediaViewSet)
router.register(r'actions',views_.ActionViewSet)
router.register(r'statuses',views_.StatusViewSet)
router.register(r'schedulers',views_.SchedulerViewSet)
"""
reference only

scheduler_list=views_.SchedulerViewSet.as_view({
    'get': 'list',
    'post': 'create'
})
scheduler_detail=views_.SchedulerViewSet.as_view({
    'get': 'retrieve',
    'put': 'update',
    'patch': 'partial_update',
    'delete': 'destroy'
})
"""

# Wire up our API using automatic URL routing.
# Additionally, we include login URLs for the browsable API.
urlpatterns = [
    url(r'^admin/', include(admin.site.urls)),
    url(r'^obj/', include(router.urls)),
    #url(r'^obj/schedulers/$', scheduler_list, name='scheduler-list'),
    #url(r'^obj/schedulers/(?P<pk>[0-9]+)/$', scheduler_detail, name='scheduler-detail'),
    url(r'^api-auth/', include('rest_framework.urls', namespace='rest_framework')),
    url(r'^api-token-auth/', views_.obtain_auth_token),
    url(r'^media/photos/(?P<filename>[\w,\s-]+\.[A-Za-z]{3})(/(?P<isthumb>[\w,\s]))?', views_.show_picture),
    url(r"^$", views_.index,name='index'),
    #url(r"^token/",views_.getAuthToken,name="auth-token"),
    url(r'^entry', views_.index, name='index'),
    #url(r'', include('social_auth.urls')),
    #url(r'^scheduler_list/$', views_.scheduler_list),
    #url(r'^scheduler_detail/(?P<pk>[0-9]+)$', views_.scheduler_detail),
]

#urlpatterns = format_suffix_patterns(urlpatterns)
