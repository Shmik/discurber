# Generated by Django 2.0.6 on 2018-08-12 05:39

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('pins', '0004_add_address_components'),
    ]

    operations = [
        migrations.AlterField(
            model_name='pin',
            name='created',
            field=models.DateTimeField(auto_now_add=True),
        ),
    ]
