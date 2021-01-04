from django.db import models

# Create your models here.

# class User(AbstractUser):
#     is_student = models.BooleanField()
#     is_teacher = models.BooleanField()
#
#     def __str__(self):
#         return self.username
#
#
# class Student(models.Model):
#     user = models.OneToOneField(User, on_delete=models.CASCADE)
#
#     def __str__(self):
#         return self.user.username

# Quick reference: https://docs.djangoproject.com/en/3.1/topics/db/models/


class Student(models.Model):
    # Each student within the system is uniquely identified by their email. Hence primary_key=True
    email = models.CharField(max_length=30, primary_key=True)

    first_name = models.CharField(max_length=30)
    last_name = models.CharField(max_length=30)


class Essay(models.Model):
    # Each essay has only one student who owns it. Therefore there is a many-to-one relationship between essays and
    # students. Hence we use a ForeignKey.
    student = models.ForeignKey(Student, on_delete=models.CASCADE)

    # The actual file for the essay.
    file = models.FileField()
